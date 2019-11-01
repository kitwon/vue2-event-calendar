import dayjs from 'dayjs';

export default function getMonthViewStartDay(date, firstDay, mode) {
  // get cur month start day obj from data
  let start = dayjs(date).startOf(mode);

  if (start.day() < firstDay) {
  // if start day behind of the view's first day,
  // start day should subtract a week -
  // to include all days of the month
    start = start.subtract(1, 'week');
  }

  // set final start day
  start = start.add(firstDay - start.day(), 'day');
  return start;
}
