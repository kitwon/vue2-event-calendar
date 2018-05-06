import dayjs from 'dayjs'

export function getMonthViewStartDay(date, firstDay, mode) {
  firstDay = parseInt(firstDay)
  // get cur month start day obj from data
  let start = dayjs(date)
  let startTemp = dayjs(start.startOf(mode))
  // subtract the start day & cur month start day
  // if cur day is Wed, the view start day should substract 2
  start.subtract(startTemp.day(), 'day')

  if (startTemp.day() < firstDay) {
    // if start day back of the view's first day
    // view start should substrat a week
    start.subtract(7, 'day')
  }

  // set final start day
  start.add(firstDay, 'day')
  return start
}

export function getMonthViewEndDay(date) {
  return this.getMonthViewStartDay().add(6, 'week')
}
