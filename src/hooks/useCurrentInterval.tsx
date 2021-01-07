import './Interval.scss'

import { CalendarDayBodySlotScope } from '../types'
import { computed, onMounted, onUnmounted, ref } from 'vue'

export function useCurrentInterval() {
  const calendar = ref<any>(null)
  let timer: any = null

  const nowY = computed(() => {
    const c = calendar.value
    return c ? calendar.value.timeToY(c.times.now) + 'px' : '-10px'
  })

  const getCurrentTime = () => {
    const { value: c } = calendar

    return c ? c.times.now.hour * 60 + c.times.now.minute : 0
  }

  const scrollToTime = () => {
    const time = getCurrentTime()
    const first = Math.max(0, time - (time % 30) - 30)

    calendar.value?.scrollToTime(first)
  }

  const updateTime = () => {
    timer = setInterval(() => calendar.value.updateTimes(), 60 * 1000)
  }

  onMounted(() => {
    scrollToTime()
    updateTime()
  })

  onUnmounted(() => {
    clearInterval(timer)
  })

  const renderDayBody = ({ date, week }: CalendarDayBodySlotScope) => {
    return (
      <div
        class={['v-current-time', { 'is-first': date === week[0].date }]}
        style={{ top: nowY.value }}
      ></div>
    )
  }

  return { calendar, nowY, getCurrentTime, scrollToTime, renderDayBody }
}

export function CurrentInterval(props: {
  data: CalendarDayBodySlotScope
  nowY: string
}) {
  const { data, nowY } = props
  return (
    <div
      class={[
        'v-current-time',
        { 'is-first': data.date === data.week[0].date }
      ]}
      style={{ top: nowY }}
    ></div>
  )
}
