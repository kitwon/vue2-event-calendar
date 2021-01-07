// Styles
import './Daily.scss'
// Types
import { CalendarTimestamp, SlotNames } from './types'
// Props
import props from './util/props'
// Component
import ScrollView from './components/ScrollView'
// Hooks
import useBase from './hooks/useBase'
import useMouse from './hooks/useMouse'
import useIntervals from './hooks/useIntervals'
// Util
import { convertToUnit, getSlot } from './util/helpers'
import { defineComponent, h, ref } from 'vue'

export default defineComponent({
  name: 'CalendarDaily',
  props: {
    ...props.base,
    ...props.calendar,
    ...props.intervals
  },
  setup(props, ctx) {
    const {
      getRelativeClasses,
      weekdayFormatter,
      dayFormatter,
      parsedStart
    } = useBase(props)
    const { getDefaultMouseEventHandlers } = useMouse(ctx)
    const {
      getSlotScope,
      bodyHeight,
      scrollRef,
      scrollToTime,
      getTimestampAtEvent,
      showIntervalLabelDefault,
      intervalFormatter,
      intervals,
      days
    } = useIntervals(props)
    const scrollPush = ref(0)

    // -------------- Components ---------------
    const Head = () => {
      const width = convertToUnit(props.intervalWidth)

      return (
        <div
          class="v-calendar-daily__head"
          style={{ marginRight: scrollPush.value + 'px' }}
        >
          <div class="v-calendar-daily__intervals-head" style={{ width }}>
            {getSlot(ctx.slots, 'interval-header')}
          </div>

          {days.value.map((day, index) => (
            <div
              class={['v-calendar-daily__head-day', getRelativeClasses(day)]}
              {...getDefaultMouseEventHandlers(':day', () => getSlotScope(day))}
            >
              <div class="v-calendar-daily__head-weekday">
                {weekdayFormatter.value(day, props.shortWeekdays)}
              </div>

              <div class="v-calendar-daily__head-day-label">
                {getSlot(ctx.slots, 'day-label-header', day) ||
                  dayFormatter.value(day, false)}
              </div>

              {getSlot(ctx.slots, SlotNames.header, () => ({
                week: days.value,
                ...day,
                index
              }))}
            </div>
          ))}
        </div>
      )
    }

    const IntervalLabel = ({ interval }: { interval: CalendarTimestamp }) => {
      const short: boolean = props.shortIntervals
      const shower = props.showIntervalLabel || showIntervalLabelDefault
      const show = shower(interval)
      const label = show ? intervalFormatter.value(interval, short) : undefined

      return (
        <div
          class="v-calendar-daily__interval"
          style={{ height: convertToUnit(props.intervalHeight) }}
          key={interval.time}
        >
          <div class="v-calendar-daily__interval-text">{label}</div>
        </div>
      )
    }

    const Body = () => {
      return (
        <div class="v-calendar-daily__body">
          <ScrollView class="v-calendar-daily__scroll-area" ref={scrollRef}>
            <div
              class="v-calendar-daily__pane"
              style={{ height: convertToUnit(bodyHeight.value) }}
            >
              <div class="v-calendar-daily__day-container">
                <div
                  class="v-calendar-daily__intervals-body"
                  style={{ width: convertToUnit(props.intervalWidth) }}
                  {...getDefaultMouseEventHandlers(':interval', e =>
                    getTimestampAtEvent(e, parsedStart.value)
                  )}
                >
                  {intervals.value[0].map(interval => (
                    <IntervalLabel interval={interval}></IntervalLabel>
                  ))}
                </div>

                {days.value.map((day, index) => {
                  return (
                    <div
                      class={['v-calendar-daily__day', getRelativeClasses(day)]}
                      key={day.date}
                      {...getDefaultMouseEventHandlers(':time', e =>
                        getSlotScope(getTimestampAtEvent(e, day))
                      )}
                    >
                      {intervals.value[index]?.map(interval => {
                        const styler = props.intervalStyle || (() => ({}))
                        return (
                          <div
                            class="v-calendar-daily__day-interval"
                            style={{
                              height: convertToUnit(props.intervalHeight),
                              ...styler(interval)
                            }}
                            key={interval.time}
                          >
                            {getSlot(
                              ctx.slots,
                              'interval',
                              getSlotScope(interval)
                            )}
                          </div>
                        )
                      })}

                      {getSlot(
                        ctx.slots,
                        SlotNames.body,
                        getSlotScope(day) || []
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollView>
        </div>
      )
    }

    return {
      Head,
      Body,
      scrollToTime
    }
  },
  render() {
    return h(
      'div',
      {
        class: 'v-calendar-daily',
        onDragStart: (e: Event) => e.preventDefault()
      },
      [!this.$props.hideHeader && this.Head(), this.Body()]
    )
  }
})
