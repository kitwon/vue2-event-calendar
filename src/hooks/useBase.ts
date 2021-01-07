import {
  createDayList,
  createNativeLocaleFormatter,
  getTimestampIdentifier,
  getWeekdaySkips,
  getStartOfWeek,
  getEndOfWeek,
  parseTimestamp
} from '../util/timestamp'
import { CalendarFormatter, CalendarTimestamp } from '../types'
import { computed } from 'vue'
import useTimes from './useTimes'
import { BaseProps } from '../util/props'

export default function useBase(props: BaseProps) {
  const { times, updateTimes } = useTimes(props.now)

  const parsedWeekdays = computed(() => {
    return Array.isArray(props.weekdays)
      ? props.weekdays
      : (props.weekdays || '').split(',').map((x: any) => parseInt(x, 10))
  })
  const weekdaySkips = computed(() => {
    return getWeekdaySkips(parsedWeekdays.value)
  })
  const weekdaySkipsReverse = computed(() => {
    const reversed = weekdaySkips.value.slice()
    reversed.reverse()
    return reversed
  })
  const parsedStart = computed(() => {
    return parseTimestamp(props.start, true)
  })
  const parsedEnd = computed(() => {
    const start = parsedStart.value
    const end: CalendarTimestamp = props.end
      ? parseTimestamp(props.end) || start
      : start

    return getTimestampIdentifier(end) < getTimestampIdentifier(start)
      ? start
      : end
  })
  const days = computed(() => {
    return createDayList(
      parsedStart.value,
      parsedEnd.value,
      times.today,
      weekdaySkips.value
    )
  })

  const dayFormatter = computed(() => {
    if (props.dayFormat) {
      return props.dayFormat
    }

    const options = { timeZone: 'UTC', day: 'numeric' }

    return createNativeLocaleFormatter(props.locale, () => options)
  })
  const weekdayFormatter = computed(() => {
    if (props.weekdayFormat) {
      return props.weekdayFormat
    }

    const longOptions = { timeZone: 'UTC', weekday: 'long' }
    const shortOptions = { timeZone: 'UTC', weekday: 'short' }

    return createNativeLocaleFormatter(props.locale, (_tms, short) =>
      short ? shortOptions : longOptions
    )
  })
  const getFormatter = (options: object): CalendarFormatter => {
    return createNativeLocaleFormatter(props.locale, () => options)
  }
  const getRelativeClasses = (
    timestamp: CalendarTimestamp,
    outside = false
  ) => {
    return {
      'v-present': timestamp.present,
      'v-past': timestamp.past,
      'v-future': timestamp.future,
      'v-outside': outside
    }
  }

  return {
    times,
    parsedWeekdays,
    weekdaySkips,
    weekdaySkipsReverse,
    parsedStart,
    parsedEnd,
    days,
    dayFormatter,
    weekdayFormatter,
    updateTimes,
    getFormatter,
    getRelativeClasses,
    getStartOfWeek: (timestamp: CalendarTimestamp) => {
      return getStartOfWeek(timestamp, parsedWeekdays.value, times.today)
    },
    getEndOfWeek: (timestamp: CalendarTimestamp) => {
      return getEndOfWeek(timestamp, parsedWeekdays.value, times.today)
    }
  }
}
