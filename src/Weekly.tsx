// Styles
import './Weekly.scss'

import { CalendarTimestamp, SlotNames } from './types'
import { computed, defineComponent } from 'vue'
import useBase from './hooks/useBase'
import useMouse from './hooks/useMouse'
import { weekNumber } from './util/dateTimeUtils'
import { genIntComputed, getSlot } from './util/helpers'
import props from './util/props'
import { createDayList, getDayIdentifier } from './util/timestamp'

export default defineComponent({
  name: 'CalendarWeekly',
  props: {
    ...props.base,
    ...props.calendar,
    ...props.weeks
  },
  setup(props, ctx) {
    const {
      times,
      getStartOfWeek,
      getEndOfWeek,
      weekdaySkips,
      parsedWeekdays,
      getRelativeClasses,
      weekdayFormatter,
      parsedEnd,
      parsedStart,
      dayFormatter
    } = useBase(props)
    const { getDefaultMouseEventHandlers } = useMouse(ctx)

    const todayWeek = computed(() => {
      const today = times.today
      const start = getStartOfWeek(today)
      const end = getEndOfWeek(today)

      return createDayList(
        start,
        end,
        today,
        weekdaySkips.value,
        parsedWeekdays.value.length,
        parsedWeekdays.value.length
      )
    })

    const parsedMinWeeks = genIntComputed(props.minWeeks)
    const days = computed(() => {
      const minDays = parsedMinWeeks.value * parsedWeekdays.value.length
      const start = getStartOfWeek(parsedStart.value)
      const end = getEndOfWeek(parsedEnd.value)

      return createDayList(
        start,
        end,
        times.today,
        weekdaySkips.value,
        Number.MAX_SAFE_INTEGER,
        minDays
      )
    })

    // ----------- Getters -------------
    const getWeekNumber = (determineDay: CalendarTimestamp) => {
      return weekNumber(
        determineDay.year,
        determineDay.month - 1,
        determineDay.day,
        parsedWeekdays.value[0],
        parseInt(props.localeFirstDayOfYear as string)
      )
    }
    const isOutside = (day: CalendarTimestamp) => {
      const dayIdentifier = getDayIdentifier(day)

      return (
        dayIdentifier < getDayIdentifier(parsedStart.value) ||
        dayIdentifier > getDayIdentifier(parsedEnd.value)
      )
    }

    // ----------- Components -----------
    const Head = () => {
      return (
        <div class="v-calendar-weekly__head">
          {props.showWeek && (
            <div class="v-calendar-weekly__head-weeknumber"></div>
          )}

          {todayWeek.value.map(day => {
            return (
              <div
                class={[
                  'v-calendar-weekly__head-weekday',
                  getRelativeClasses(day)
                ]}
              >
                {weekdayFormatter.value(day, props.shortWeekdays)}
              </div>
            )
          })}
        </div>
      )
    }

    const genWeek = (week: CalendarTimestamp[], weekNumber: number) => {
      return (
        <div class="v-calendar-weekly__week">
          {props.showWeek && (
            <div class="v-calendar-weekly__weeknumber">
              <small>{weekNumber}</small>
            </div>
          )}
          {week.map((day, index) => {
            const outside = isOutside(day)
            return (
              <div
                class={[
                  'v-calendar-weekly__day',
                  getRelativeClasses(day, outside)
                ]}
                key={day.date}
                {...getDefaultMouseEventHandlers(':day', () => day)}
              >
                <div class="v-calendar-weekly__day-label">
                  {getSlot(ctx.slots, 'day-label', day) ||
                    dayFormatter.value(day, false)}
                  {getSlot(ctx.slots, SlotNames.day, {
                    outside,
                    index,
                    week,
                    ...day
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    const genWeeks = () => {
      const weekDays = parsedWeekdays.value.length
      const weeks = []

      for (let i = 0; i < days.value.length; i += weekDays) {
        weeks.push(
          genWeek(
            days.value.slice(i, i + weekDays),
            getWeekNumber(days.value[i])
          )
        )
      }

      return weeks
    }

    return () => (
      <div class="v-calendar-weekly" onDragstart={e => e.preventDefault()}>
        {!props.hideHeader && <Head />}
        {genWeeks()}
      </div>
    )
  }
})
