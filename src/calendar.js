import moment from 'moment'
import dateFunc from './date-func'
import genBody from './components/body'
import genHeader from './components/header'

import './style/calendar.less'

const prefixCls = 'vue-calendar'

function checkType(data) {
  return Object.prototype.toString.call(data)
}

export default {
  name: prefixCls,
  mixins: [genBody, genHeader, dateFunc],
  props: {
    startDate: [Number, String, Date],
    dateData: [Object, Array],
    matchKey: {
      type: String,
      default: 'date'
    },
    locale: {
      type: String,
      default: 'zh-cn'
    },
    firstDay: {
      type: Number,
      default: 0
    },
    mode: {
      type: String,
      default: 'month',
      validator(value) {
        return value === 'month' || value === 'week'
      }
    },
    prefixCls: {
      type: String,
      default: prefixCls
    },
    weekDateShort: Array,
    onMonthChange: Function,
    onPrev: Function,
    onNext: Function
  },
  computed: {
    formatedDay() {
      return this.moment(this.currentDay)
    },
    monthData() {
      const { dateData, formatedDay, firstDay, mode } = this
      const dataType = checkType(dateData)

      if (!formatedDay) return []

      let monthViewStartDate = this.getMonthViewStartDay(
        formatedDay,
        firstDay,
        mode
      )
      let monthData = []
      let row = 6

      if (this.mode === 'week') row = 1

      for (let day = 0; day < 7 * row; day++) {
        let data = []
        if (dataType === '[object Object]') {
          Object.keys(dateData).forEach(item => {
            if (monthViewStartDate.isSame(
              this.moment(new Date(item)),
              'day'
            )) {
              data.push(dateData[item])
            }
          })
        } else if (dataType === '[object Array]') {
          data = dateData.filter(item => {
            return monthViewStartDate.isSame(
              this.moment(new Date(item[this.matchKey])),
              'day'
            )
          })
        }

        monthData.push({
          ...this.getItemStatus(monthViewStartDate),
          data: data || {},
          date: {
            year: monthViewStartDate.year(),
            month: monthViewStartDate.month() + 1,
            date: monthViewStartDate.date(),
            day: monthViewStartDate.day(),
            full: monthViewStartDate.format('YYYY-MM-DD')
          }
        })

        monthViewStartDate.add(1, 'day')
      }

      return monthData
    }
  },
  methods: {
    changeDate(date) {
      if (typeof date !== 'string' && Object.prototype.toString.call(date) !== '[object Date]') {
        console.error('invalied date!')
        return false
      }

      this.currentDay = date
    },
    prev() {
      this.currentDay = this.formatedDay
        .subtract(1, `${this.mode}s`)
        .startOf(this.mode)
        .format('YYYY-MM-DD')

      this.onPrev &&
        this.onPrev({
          startDay: this.monthData[0].date,
          endDay: this.monthData[this.monthData.length - 1].date
        })
    },
    next() {
      this.currentDay = this.formatedDay
        .add(1, `${this.mode}s`)
        .startOf(this.mode)
        .format('YYYY-MM-DD')

      this.onNext &&
        this.onNext({
          startDay: this.monthData[0].date,
          endDay: this.monthData[this.monthData.length - 1].date
        })
    },
    getItemStatus(date) {
      const isCurMonth = date.isSame(this.formatedDay, 'month')
      let isPrevLastDay = false
      let isNextFirstDay = false

      const isPrevMonth =
        !isCurMonth && date.isBefore(this.formatedDay, 'month')
      const isNextMonth = !isCurMonth && date.isAfter(this.formatedDay, 'month')

      isPrevMonth &&
        (isPrevLastDay = date.isSame(
          this.moment(date)
            .endOf('month')
            .format('YYYY-MM-DD')
        ))
      isNextMonth &&
        (isNextFirstDay = date.isSame(
          this.moment(date)
            .startOf('month')
            .format('YYYY-MM-DD')
        ))

      return {
        isPrevMonth: isPrevMonth,
        isPrevLastDay: isPrevLastDay,
        isNextMonth: isNextMonth,
        isNextFirstDay: isNextFirstDay,
        isToday: date.isSame(this.moment(this.today), 'day'),
        isCurMonth: isCurMonth
      }
    },
    changeViewData() {
      this.onMonthChange &&
        this.onMonthChange({
          startDay: this.monthData[0].date,
          endDay: this.monthData[this.monthData.length - 1].date
        })
    }
  },
  watch: {
    startDate: {
      immediate: true,
      handler(val) {
        this.currentDay = val ? new Date(val) : new Date()

        if (!this.today) {
          this.today = val
        }
      }
    },
    currentDay: {
      immediate: true,
      handler(val, oval) {
        // if (val.isSame(oval, 'day')) return
        // this.$emit('input', val.format('YYYY-MM-DD'))

        this.changeViewData()
      }
    },
    mode(val) {
      this.changeViewData()
    }
  },
  data() {
    return {
      today: '',
      currentDay: null,
      moment: moment,
      localeData: {
        'zh-cn': '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        'en': 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_')
      }
    }
  },
  render(h) {
    return h(
      'div',
      {
        class: [this.prefixCls, `is-${this.mode}`]
      },
      [this.genHeader(h), this.genWeekTitle(h), this.genCalendateItem(h)]
    )
  }
}
