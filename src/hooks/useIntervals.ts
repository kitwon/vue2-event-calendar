// Hooks
import useBase from './useBase'

// Util
import { BaseProps, IntervalProps } from '../util/props'
import {
  parseTime,
  copyTimestamp,
  updateMinutes,
  createDayList,
  createIntervalList,
  createNativeLocaleFormatter,
  VTime,
  MINUTES_IN_DAY
} from '../util/timestamp'
import { genIntComputed } from '../util/helpers'
import { computed, ref } from 'vue'

// Types
import { CalendarTimestamp, CalendarFormatter } from '../types'

export default function useIntervals(props: IntervalProps & BaseProps) {
  // Hooks
  const { parsedStart, parsedEnd, times, weekdaySkips } = useBase(props)
  const scrollRef = ref<any>(null)

  // Props parser
  const parsedFirstInterval = genIntComputed(props.firstInterval)
  const parsedIntervalMinutes = genIntComputed(props.intervalMinutes)
  const parsedIntervalCount = genIntComputed(props.intervalCount)
  const parsedIntervalHeight = computed(() => {
    return parseFloat(props.intervalHeight as string)
  })
  const parsedFirstTime = computed(() => parseTime(props.firstTime))
  const firstMinute = computed(() => {
    const time = parsedFirstTime.value

    return time !== false && time >= 0 && time <= MINUTES_IN_DAY
      ? time
      : parsedFirstInterval.value * parsedIntervalMinutes.value
  })
  const bodyHeight = computed(
    () => parsedIntervalCount.value * parsedIntervalHeight.value
  )
  const days = computed(() =>
    createDayList(
      parsedStart.value,
      parsedEnd.value,
      times.today,
      weekdaySkips.value,
      props.maxDays
    )
  )
  const intervals = computed(() => {
    const d: CalendarTimestamp[] = days.value
    const first: number = firstMinute.value
    const minutes: number = parsedIntervalMinutes.value
    const count: number = parsedIntervalCount.value
    const now: CalendarTimestamp = times.now

    return d.map(d => createIntervalList(d, first, minutes, count, now))
  })
  const intervalFormatter = computed(() => {
    if (props.intervalFormat) {
      return props.intervalFormat as CalendarFormatter
    }

    const longOptions = { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' }
    const shortOptions = {
      timeZone: 'UTC',
      hour: 'numeric',
      minute: '2-digit'
    }
    const shortHourOptions = { timeZone: 'UTC', hour: 'numeric' }

    return createNativeLocaleFormatter(props.locale, (tms, short) =>
      short ? (tms.minute === 0 ? shortHourOptions : shortOptions) : longOptions
    )
  })

  const minutesToPixels = (minutes: number) => {
    return (minutes / parsedIntervalMinutes.value) * parsedIntervalHeight.value
  }

  const timeDelta = (time: VTime) => {
    const minutes = parseTime(time)

    if (minutes === false) {
      return false
    }

    const min: number = firstMinute.value
    const gap: number = parsedIntervalCount.value * parsedIntervalMinutes.value

    return (minutes - min) / gap
  }

  const timeToY = (time: VTime, clamp = true) => {
    let y = timeDelta(time)

    if (y !== false) {
      y *= bodyHeight.value

      if (clamp) {
        if (y < 0) {
          y = 0
        }
        if (y > bodyHeight.value) {
          y = bodyHeight.value
        }
      }
    }

    return y
  }

  const scrollToTime = (time: VTime) => {
    const y = timeToY(time)
    const pane = scrollRef.value.scrollRef as HTMLElement

    if (y === false || !pane) {
      return false
    }

    pane.scrollTop = y

    return true
  }

  const getSlotScope = (timestamp: CalendarTimestamp) => {
    const scope = copyTimestamp(timestamp) as any
    scope.timeToY = timeToY
    scope.timeDelta = timeDelta
    scope.minutesToPixels = minutesToPixels
    scope.week = { ...days.value }
    return scope
  }

  const showIntervalLabelDefault = (interval: CalendarTimestamp) => {
    const first: CalendarTimestamp = intervals.value[0][0]
    const isFirst: boolean =
      first.hour === interval.hour && first.minute === interval.minute
    return !isFirst
  }

  const getTimestampAtEvent = (
    e: MouseEvent | TouchEvent,
    day: CalendarTimestamp
  ) => {
    const timestamp: CalendarTimestamp = copyTimestamp(day)
    const bounds = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const baseMinutes: number = firstMinute.value
    const touchEvent: TouchEvent = e as TouchEvent
    const mouseEvent: MouseEvent = e as MouseEvent
    const touches: TouchList = touchEvent.changedTouches || touchEvent.touches
    const clientY: number =
      touches && touches[0] ? touches[0].clientY : mouseEvent.clientY
    const addIntervals: number =
      (clientY - bounds.top) / parsedIntervalHeight.value
    const addMinutes: number = Math.floor(
      addIntervals * parsedIntervalMinutes.value
    )
    const minutes: number = baseMinutes + addMinutes

    return updateMinutes(timestamp, minutes, times.now)
  }

  return {
    intervals,
    intervalFormatter,
    bodyHeight,
    scrollRef,
    scrollToTime,
    getSlotScope,
    showIntervalLabelDefault,
    getTimestampAtEvent,
    timeToY,
    days
  }
}
