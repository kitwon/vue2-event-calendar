// Types
import { computed, SetupContext, VNode } from 'vue'

// Directives
// import ripple from '../../../directives/ripple'

// Hooks
import useBase from './useBase'
import useMouse from './useMouse'

// Helpers
import {
  escapeHTML,
  genFunctionComputed,
  genIntComputed,
  getColor
} from '../util/helpers'

// Util
import { BaseProps, CategoryProps, EventProps } from '../util/props'
import { CalendarEventOverlapModes } from '../modes'
import { getDayIdentifier, diffMinutes } from '../util/timestamp'
import { parseEvent, isEventStart, isEventOn } from '../util/events'
import {
  CalendarTimestamp,
  CalendarEventParsed,
  CalendarEventVisual,
  CalendarEventColorFunction,
  CalendarEventNameFunction,
  CalendarEventTimedFunction,
  CalendarDaySlotScope,
  CalendarDayBodySlotScope,
  CalendarEventOverlapMode,
  CalendarEventCategoryFunction,
  SlotNames
} from '../types'

// Types
export type VEventGetter<D> = (day: D) => CalendarEventParsed[]

export type VEventVisualToNode<D> = (
  visual: CalendarEventVisual,
  day: D
) => VNode | false

export type VEventsToNodes = <D extends CalendarDaySlotScope>(
  day: D,
  getter: VEventGetter<D>,
  mapper: VEventVisualToNode<D>,
  timed: boolean
) => VNode[] | undefined

export type VDailyEventsMap = {
  [date: string]: {
    parent: HTMLElement
    more: HTMLElement | null
    events: HTMLElement[]
  }
}

export interface VEventScopeInput {
  eventParsed: CalendarEventParsed
  day: CalendarDaySlotScope
  start: boolean
  end: boolean
  timed: boolean
}
export type DayScope = (day: CalendarDaySlotScope) => VNode[] | undefined
export type DayBodyScope = (
  day: CalendarDayBodySlotScope
) => VNode[] | undefined

const WIDTH_FULL = 100
const WIDTH_START = 95
const MINUTES_IN_DAY = 24 * 60

export default function useEvents(
  props: EventProps & CategoryProps & BaseProps,
  ctx: SetupContext
) {
  // HOOKS
  const { parsedWeekdays, getFormatter } = useBase(props)
  const { getDefaultMouseEventHandlers } = useMouse(ctx)

  // Event data
  const categoryMode = false
  const noEvents = computed(() => props.events.length === 0)
  const eventWeekdays = parsedWeekdays
  const eventTimedFunction = genFunctionComputed<CalendarEventTimedFunction>(
    props.eventTimed,
    event => !!event[props.eventTimed as string]
  )
  const eventColorFunction = genFunctionComputed<CalendarEventColorFunction>(
    props.eventColor
  )
  const eventCategoryFunction = genFunctionComputed<
    CalendarEventCategoryFunction
  >(props.eventCategory, event => event[props.eventCategory as string])

  const parsedEvents = computed(() =>
    props.events.map((input, idx) => {
      return parseEvent(
        input,
        idx,
        props.eventStart,
        props.eventEnd,
        eventTimedFunction.value(input),
        categoryMode ? eventCategoryFunction.value(input) : false
      )
    })
  )
  const parsedEventOverlapThreshold = genIntComputed(
    props.eventOverlapThreshold
  )
  const eventTextColorFunction = genFunctionComputed<
    CalendarEventColorFunction
  >(props.eventTextColor)
  const eventNameFunction = genFunctionComputed<CalendarEventNameFunction>(
    props.eventName,
    event => escapeHTML(event.input[props.eventName as string])
  )
  const eventModeFunction = genFunctionComputed<CalendarEventOverlapMode>(
    props.eventOverlapMode,
    CalendarEventOverlapModes[props.eventOverlapMode as string]
  )

  // ------------- Event Utils ------------
  //
  const formatTime = (withTime: CalendarTimestamp) => {
    const formatter = getFormatter({
      timeZone: 'UTC',
      hour: 'numeric',
      minute: withTime.minute > 0 ? 'numeric' : undefined
    })

    return formatter(withTime, true)
  }

  const isEventForCategory = (
    event: CalendarEventParsed,
    category: string | undefined | null
  ) => {
    return (
      !categoryMode ||
      category === event.category ||
      (typeof event.category !== 'string' && category === null)
    )
  }

  const getEventsForDayTimed = (day: CalendarDaySlotScope) => {
    const identifier = getDayIdentifier(day)

    return parsedEvents.value.filter(
      event =>
        !event.allDay &&
        isEventOn(event, identifier) &&
        isEventForCategory(event, day.category)
    )
  }

  // ------------- Event Getter ------------
  const getEventsForDay = (day: CalendarDaySlotScope) => {
    const identifier = getDayIdentifier(day)
    const firstWeekday = eventWeekdays.value[0]

    return parsedEvents.value.filter(event =>
      isEventStart(event, day, identifier, firstWeekday)
    )
  }

  const getEventsForDayAll = (day: CalendarDaySlotScope) => {
    const identifier = getDayIdentifier(day)
    const firstWeekday = eventWeekdays.value[0]

    return parsedEvents.value.filter(
      event =>
        event.allDay &&
        (categoryMode
          ? isEventOn(event, identifier)
          : isEventStart(event, day, identifier, firstWeekday)) &&
        isEventForCategory(event, day.category)
    )
  }

  // ----------- Component generator -----------
  const genPlaceholder = (day: CalendarTimestamp) => {
    const height = props.eventHeight + props.eventMarginBottom

    // TODO:
    // Loop ref
    return <div style={{ height: `${height}px` }} data-date={day.date}></div>
  }

  const genEvent = (
    event: CalendarEventParsed,
    scopeInput: VEventScopeInput,
    timedEvent: boolean,
    data: any
  ) => {
    const slot = ctx.slots[SlotNames.event]
    const text = eventTextColorFunction.value(event.input)
    const background = eventColorFunction.value(event.input)
    const overlapsNoon = event.start.hour < 12 && event.end.hour >= 12
    const singline =
      diffMinutes(event.start, event.end) <= parsedEventOverlapThreshold.value
    const timeSummary = () =>
      formatTime(event.start) + ' - ' + formatTime(event.end)
    const eventSummary = () => {
      const name = eventNameFunction.value(event, timedEvent)

      if (event.start.hasTime) {
        if (timedEvent) {
          const time = timeSummary()
          const delimiter = singline ? ', ' : '\n\n'

          return (
            <>
              <strong>{name}</strong>
              {delimiter}
              {time}
            </>
          )
        } else {
          const time = formatTime(event.start)

          return (
            <>
              <strong>{time}</strong> {name}
            </>
          )
        }
      }

      return name
    }

    const scope = {
      ...scopeInput,
      event: event.input,
      outside: scopeInput.day.outside,
      singline,
      overlapsNoon,
      formatTime,
      timeSummary,
      eventSummary
    }

    return (
      <div
        {...getDefaultMouseEventHandlers(':event', nativeEvent => ({
          ...scope,
          nativeEvent
        }))}
        {...data}
        {...getColor(
          'color',
          text,
          getColor(['background-color', 'border-color'], background)
        )}
      >
        {slot ? slot(scope) : <div>{eventSummary()}</div>}
      </div>
    )
  }

  const genDayEvent = (
    { event }: CalendarEventVisual,
    day: CalendarDaySlotScope
  ) => {
    const eventHeight = props.eventHeight
    const eventMarginBottom = props.eventMarginBottom
    const dayIdentifier = getDayIdentifier(day)
    const week = day.week
    const start = dayIdentifier === event.startIdentifier
    let end = dayIdentifier === event.endIdentifier
    let width = WIDTH_START

    if (!categoryMode) {
      for (let i = day.index + 1; i < week.length; i++) {
        const weekdayIdentifier = getDayIdentifier(week[i])
        if (event.endIdentifier >= weekdayIdentifier) {
          width += WIDTH_FULL
          end = end || weekdayIdentifier === event.endIdentifier
        } else {
          end = true
          break
        }
      }
    }
    const scope = { eventParsed: event, day, start, end, timed: false }

    return genEvent(event, scope, false, {
      class: {
        'v-event': true,
        'v-event-start': start,
        'v-event-end': end
      },
      style: {
        height: `${eventHeight}px`,
        width: `${width}%`,
        'margin-bottom': `${eventMarginBottom}px`
      },
      attrs: {
        'data-date': day.date
      },
      key: event.index,
      // Refactor:
      // Use ref()
      ref: 'events',
      refInFor: true
    })
  }

  const genMore = (day: CalendarDaySlotScope) => {
    const eventHeight = props.eventHeight
    const eventMarginBottom = props.eventMarginBottom

    return (
      <div
        class={['v-event-more', { 'is-outside': day.outside }]}
        data-date={day.date}
        data-more={1}
        onClick={() => ctx.emit('click:more', day)}
        style={{
          display: 'none',
          height: `${eventHeight}px`,
          marginBottom: `${eventMarginBottom}px`
        }}
      ></div>
    )
  }

  const genTimedEvent = (
    { event, left, width }: CalendarEventVisual,
    day: CalendarDayBodySlotScope
  ) => {
    if (day.timeDelta(event.end) <= 0 || day.timeDelta(event.start) >= 1) {
      return false
    }

    const dayIdentifier = getDayIdentifier(day)
    const start = event.startIdentifier >= dayIdentifier
    const end = event.endIdentifier > dayIdentifier
    const top = start ? day.timeToY(event.start) : 0
    const bottom = end ? day.timeToY(MINUTES_IN_DAY) : day.timeToY(event.end)
    const height = Math.max(props.eventHeight, bottom - top)
    const scope = { eventParsed: event, day, start, end, timed: true }

    return genEvent(event, scope, true, {
      class: 'v-event-timed',
      style: {
        top: `${top}px`,
        height: `${height}px`,
        left: `${left}%`,
        width: `${width}%`
      }
    })
  }

  /**
   * Merge event slots and user slots
   */
  const getScopeSlots = (): {
    [key in SlotNames]?: DayBodyScope | DayScope
  } => {
    if (noEvents.value) {
      return { ...ctx.slots }
    }

    const mode = eventModeFunction.value(
      parsedEvents.value,
      eventWeekdays.value[0],
      parsedEventOverlapThreshold.value
    )

    const isNode = (input: VNode | false): input is VNode => !!input

    // ----------- Slot generator -----------
    const getSlotChildren: VEventsToNodes = (day, getter, mapper, timed) => {
      const events = getter(day)
      const visuals = mode(day, events, timed, categoryMode)

      if (timed) {
        return visuals.map(visual => mapper(visual, day)).filter(isNode)
      }

      const children: VNode[] = []

      visuals.forEach(visual => {
        while (children.length < visual.column) {
          children.push(genPlaceholder(day))
        }

        const mapped = mapper(visual, day)
        if (mapped) {
          children.push(mapped)
        }
      })

      return children
    }

    const slots = ctx.slots
    const slotDay = slots[SlotNames.day]
    const slotDayHeader = slots[SlotNames.header]
    const slotDayBody = slots[SlotNames.body]

    return {
      ...slots,
      [SlotNames.day]: (day: CalendarDaySlotScope) => {
        let children = getSlotChildren(day, getEventsForDay, genDayEvent, false)
        if (children && children.length > 0 && props.eventMore) {
          children.push(genMore(day))
        }
        if (slotDay) {
          const slot = slotDay(day)
          if (slot) {
            children = children ? children.concat(slot) : slot
          }
        }
        return children
      },
      [SlotNames.header]: (day: CalendarDaySlotScope) => {
        let children = getSlotChildren(
          day,
          getEventsForDayAll,
          genDayEvent,
          false
        )

        if (slotDayHeader) {
          const slot = slotDayHeader(day)
          if (slot) {
            children = children ? children.concat(slot) : slot
          }
        }
        return children
      },
      [SlotNames.body]: (day: CalendarDayBodySlotScope) => {
        const events = getSlotChildren(
          day,
          getEventsForDayTimed,
          genTimedEvent,
          true
        )
        let children: VNode[] = [
          <div class="v-event-timed-container">{events}</div>
        ]

        if (slotDayBody) {
          const slot = slotDayBody(day)
          if (slot) {
            children = children.concat(slot)
          }
        }
        return children
      }
    }
  }

  return { noEvents, parsedEvents, getScopeSlots }
}
