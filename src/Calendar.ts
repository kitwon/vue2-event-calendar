// Styles
import './Event.scss'

import { Component, computed, defineComponent, h, reactive, ref } from 'vue'
import props from './util/props'

// Types
import { CalendarTimestamp } from './types'

// Hooks
import useEvents from './hooks/useEvents'
import useBase from './hooks/useBase'
import useIntervals from './hooks/useIntervals'

// import resize from './directives/resize'

// Components
import Daily from './Daily'
import Weekly from './Weekly'

import {
  copyTimestamp,
  DAYS_IN_MONTH_MAX,
  DAYS_IN_WEEK,
  DAY_MIN,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
  nextDay,
  parseTimestamp,
  prevDay,
  relativeDays,
  timestampToDate,
  updateFormatted,
  updateRelative,
  updateWeekday,
  validateTimestamp,
  VTime
} from './util/timestamp'
// import { genIntComputed } from './util/helpers'

interface VCalendarRenderProps {
  start: CalendarTimestamp
  end: CalendarTimestamp
  component: string | Component
  maxDays: number
  weekdays: number[]
  categories: string[]
}

const Calendar = defineComponent({
  name: 'Calendar',
  props: {
    ...props.base,
    ...props.calendar,
    ...props.weeks,
    ...props.intervals,
    ...props.category,
    ...props.events
  },
  setup(props, ctx) {
    const {
      times,
      parsedStart,
      parsedEnd,
      parsedWeekdays,
      updateTimes
    } = useBase(props)
    const { noEvents, getScopeSlots } = useEvents(props, ctx)
    const { timeToY } = useIntervals(props)
    const calendarRef = ref<any>(null)
    const history = reactive({
      lastStart: null as CalendarTimestamp | null,
      lastEnd: null as CalendarTimestamp | null
    })

    const parsedValue = computed(() => {
      return validateTimestamp(props.modelValue)
        ? parseTimestamp(props.modelValue, true)
        : parsedStart.value
    })

    const getCalendarStartOfWeek = (timestamp: CalendarTimestamp) => {
      return getStartOfWeek(timestamp, parsedWeekdays.value, times.today)
    }
    const getCalendarEndOfWeek = (timestamp: CalendarTimestamp) => {
      return getEndOfWeek(timestamp, parsedWeekdays.value, times.today)
    }

    const renderProps = computed(() => {
      const around = parsedValue.value
      let component: any = null
      let maxDays = props.maxDays
      let weekdays = parsedWeekdays.value
      let classes = ''
      let start = around
      let end = around
      switch (props.type) {
        case 'month':
          component = Weekly
          start = getStartOfMonth(around)
          end = getEndOfMonth(around)
          classes = 'v-calendar-month'
          break
        case 'week':
          component = Daily
          start = getCalendarStartOfWeek(around)
          end = getCalendarEndOfWeek(around)
          maxDays = 7
          break
        case 'day':
          component = Daily
          maxDays = 1
          weekdays = [start.weekday]
          break
        case 'custom-weekly':
          component = Weekly
          start = parsedStart.value || around
          end = parsedEnd.value
          break
        case 'custom-daily':
          component = Daily
          start = parsedStart.value || around
          end = parsedEnd.value
          break
        default:
          throw new Error(props.type + ' is not a valid Calendar type')
      }

      return {
        component,
        classes,
        props: { start, end, maxDays, weekdays }
      }
    })

    // ------------------ Calendar methods ---------------------
    const move = (amount = 1) => {
      const moved = copyTimestamp(parsedValue.value)
      const forward = amount > 0
      const mover = forward ? nextDay : prevDay
      const limit = forward ? DAYS_IN_MONTH_MAX : DAY_MIN
      let step = forward ? amount : -amount

      while (--step >= 0) {
        switch (props.type) {
          case 'month':
            moved.day = limit
            mover(moved)
            break
          case 'week':
          case 'custom-weekly':
            relativeDays(moved, mover, DAYS_IN_WEEK)
            break
          case 'day':
            relativeDays(moved, mover, 1)
            break
          case '4day':
            relativeDays(moved, mover, 4)
            break
        }
      }

      updateWeekday(moved)
      updateFormatted(moved)
      updateRelative(moved, times.now)

      if (props.modelValue instanceof Date) {
        ctx.emit('update:modelValue', timestampToDate(moved))
      } else if (typeof props.modelValue === 'number') {
        ctx.emit('update:modelValue', timestampToDate(moved).getTime())
      } else {
        ctx.emit('update:modelValue', moved.date)
      }

      ctx.emit('moved', moved)
    }
    const next = (amount = 1) => {
      move(amount)
    }
    const prev = (amount = 1) => {
      move(-amount)
    }

    const scrollToTime = (time: VTime) => {
      const c = calendarRef.value

      if (c && c.scrollToTime) {
        return c.scrollToTime(time)
      } else {
        return false
      }
    }

    const checkChange = () => {
      const { lastStart, lastEnd } = history
      const { start, end } = renderProps.value.props
      if (
        !lastStart ||
        !lastEnd ||
        start.date !== lastStart.date ||
        end.date !== lastEnd.date
      ) {
        history.lastStart = start
        history.lastEnd = end
        ctx.emit('change', { start, end })
      }
    }

    return {
      renderProps,
      parsedValue,
      noEvents,
      move,
      next,
      prev,
      getScopeSlots,
      timeToY,
      scrollToTime,
      calendarRef,
      updateTimes,
      checkChange,
      times
    }
  },
  render() {
    const { component, props, classes } = this.renderProps

    return h(
      component,
      {
        class: ['v-calendar', classes, { 'v-calendar-events': !this.noEvents }],
        ref: el => {
          this.calendarRef = el
        },
        ...this.$props,
        ...props,
        start: props.start.date,
        end: props.end.date
      },
      this.getScopeSlots()
    )
  }
})

export default Calendar
