import dayjs from 'dayjs'

export function getMonthViewStartDay(date, firstDay, mode) {
  const first = Number(firstDay)
  // get cur month start day obj from data
  let start = dayjs(date).startOf(mode)
  // let startTemp = dayjs(start.startOf(mode))
  // subtract the start day & cur month start day
  // start = start.subtract(startTemp.day(), 'day')
  // console.log(startTemp.day())

  // if (startTemp.day() < firstDay) {
  if (start.day() !== first) {
    // if start day back of the view's first day
    // view start should substrat a week
    start = start.subtract(start.day(), 'day')
  }

  // set final start day
  start = start.add(firstDay, 'day')
  return start
}

export function getMonthViewEndDay(date) {
  return this.getMonthViewStartDay().add(6, 'week')
}
