import { computed, reactive, watch } from 'vue'

import { parseTimestamp, parseDate } from '../util/timestamp'
import { CalendarTimestamp } from '../types'

export default function useTimes(now?: string) {
  const times = reactive({
    now: parseTimestamp('0000-00-00 00:00', true),
    today: parseTimestamp('0000-00-00', true)
  })

  const parsedNow = computed(() => {
    return now ? parseTimestamp(now, true) : null
  })

  const setPresent = () => {
    times.now.present = times.today.present = true
    times.now.past = times.today.past = false
    times.now.future = times.today.future = false
  }

  const getNow = () => {
    return parseDate(new Date())
  }
  const updateDay = (now: CalendarTimestamp, target: CalendarTimestamp) => {
    if (now.date !== target.date) {
      target.year = now.year
      target.month = now.month
      target.day = now.day
      target.weekday = now.weekday
      target.date = now.date
    }
  }
  const updateTime = (now: CalendarTimestamp, target: CalendarTimestamp) => {
    if (now.time !== target.time) {
      target.hour = now.hour
      target.minute = now.minute
      target.time = now.time
    }
  }

  const updateTimes = () => {
    const now: CalendarTimestamp = parsedNow.value || getNow()
    updateDay(now, times.now)
    updateTime(now, times.now)
    updateDay(now, times.today)
  }

  watch(
    () => parsedNow,
    () => {
      updateTimes()
    }
  )

  // Update time when component created
  updateTimes()
  setPresent()

  return { parsedNow, times, updateTimes }
}
