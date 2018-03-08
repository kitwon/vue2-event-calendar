export default {
  methods: {
    getMonthViewStartDay(date, firstDay, mode) {
      firstDay = parseInt(firstDay)
      // get cur month start day obj from data
      let start = this.moment(date)
      let startTemp = this.moment(start.startOf(mode))
      // subtract the start day & cur month start day
      // if cur day is Wed, the view start day should substract 2
      start.subtract(startTemp.day(), 'days')

      if (startTemp.day() < firstDay) {
        // if start day back of the view's first day
        // view start should substrat a week
        start.subtract(7, 'days')
      }

      // set final start day
      start.add(firstDay, 'days')
      return start
    },
    getMonthViewEndDay(date) {
      return this.getMonthViewStartDay().add(6, 'weeks')
    }
  }
}
