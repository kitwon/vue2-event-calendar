const NAMES = [
  'Meeting',
  'Holiday',
  'PTO',
  'Travel',
  'Event',
  'Birthday',
  'Conference',
  'Party'
]
const COLORS = [
  'blue',
  'indigo',
  'deep-purple',
  'cyan',
  'green',
  'orange',
  'grey darken-1'
]

export function rnd(a: number, b: number) {
  return Math.floor((b - a + 1) * Math.random()) + a
}

export default function genEvents(start: string, end: string, count?: number) {
  const events = []

  const min = new Date(`${start}T00:00:00`)
  const max = new Date(`${end}T23:59:59`)
  const days = (max.getTime() - min.getTime()) / 86400000
  const eventCount = count || rnd(days, days + 20)

  for (let i = 0; i < eventCount; i++) {
    const allDay = rnd(0, 3) === 0
    const firstTimestamp = rnd(min.getTime(), max.getTime())
    const first = new Date(firstTimestamp - (firstTimestamp % 900000))
    const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000
    const second = new Date(first.getTime() + secondTimestamp)

    events.push({
      name: NAMES[rnd(0, NAMES.length - 1)],
      start: first,
      end: second,
      color: COLORS[rnd(0, COLORS.length - 1)],
      timed: !allDay
    })
  }

  return events
}
