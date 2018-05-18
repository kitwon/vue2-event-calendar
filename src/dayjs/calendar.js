import '../style/calendar.less'

import {
  getMonthViewStartDay
} from './date-func'
import genBody from './components/body'
import genHeader from './components/header'
import dayjs from 'dayjs'

const prefixCls = 'vue-calendar'

function checkType(data) {
  return Object.prototype.toString.call(data)
}

export default {
  name: prefixCls,
  mixins: [genBody, genHeader],
  props: {
    startDate: [Number, String, Date],
    dateData: [Object, Array],
    matchKey: {
      type: String,
      default: 'date'
    },
    locale: {
      type: String,
      default: 'en'
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
    onMonthChange: {
      type: Function,
      default: () => undefined
    },
    onPrev: {
      type: Function,
      default: () => undefined
    },
    onNext: {
      type: Function,
      default: () => undefined
    },
    renderHeader: Function,
    weekLocaleData: Array
  },
  computed: {
    formatedDay() {
      return dayjs(new Date(this.currentDay))
    },
    monthData() {
      const {
        dateData,
        formatedDay,
        firstDay,
        mode,
        matchKey
      } = this

      const dataType = checkType(dateData)

      if (!formatedDay) return []

      let monthViewStartDate = getMonthViewStartDay(
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
            const date = item.replace('-', '/')
            if (monthViewStartDate.isSame(dayjs(new Date(date)))) {
              data.push(dateData[item])
            }
          })
        } else if (dataType === '[object Array]') {
          data = dateData.filter(item => {
            const date = item[matchKey].replace('-', '/')
            return monthViewStartDate.isSame(
              dayjs(new Date(date))
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

        monthViewStartDate = monthViewStartDate.add(1, 'day')
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
      const {
        formatedDay,
        mode,
        onPrev,
        monthData
      } = this

      this.currentDay = formatedDay
        .subtract(1, mode)
        .startOf(mode)
        .format('YYYY-MM-DD')

      onPrev({
        startDay: monthData[0].date,
        endDay: monthData[monthData.length - 1].date
      })
    },
    next() {
      const {
        formatedDay,
        mode,
        onNext,
        monthData
      } = this

      this.currentDay = formatedDay
        .add(1, mode)
        .startOf(mode)
        .format('YYYY-MM-DD')

      onNext({
        startDay: monthData[0].date,
        endDay: monthData[monthData.length - 1].date
      })
    },
    getItemStatus(date) {
      const tempDate = dayjs(date)
      const {
        formatedDay
      } = this

      const isCurMonth = tempDate.month() === formatedDay.month()

      const isPrevMonth = !isCurMonth && tempDate.isBefore(this.formatedDay, 'month')
      const isNextMonth = !isCurMonth && tempDate.isAfter(this.formatedDay, 'month')

      const isPrevLastDay = isPrevMonth ? tempDate.isSame(tempDate.endOf('month').format('YYYY-MM-DD')) : false
      const isNextFirstDay = isNextMonth ? tempDate.isSame(tempDate.startOf('month').format('YYYY-MM-DD')) : false

      return {
        isPrevMonth: isPrevMonth,
        isPrevLastDay: isPrevLastDay,
        isNextMonth: isNextMonth,
        isNextFirstDay: isNextFirstDay,
        // isToday: date.isSame(dayjs(this.today), 'day'),
        isToday: date.format('YYYY-MM-DD') === dayjs(this.today).format('YYYY-MM-DD'),
        isCurMonth: isCurMonth
      }
    },
    changeViewData() {
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
          this.today = this.currentDay
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
      today: this.currentDay,
      currentDay: null,
      localeData: {
        'zh-cn': '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        'en': 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_')
      }
    }
  },
  render(h) {
    return h(
      'div', {
        class: [this.prefixCls, `is-${this.mode}`]
      }, [this.genHeader(h), this.genWeekTitle(h), this.genCalendateItem(h)]
    )
  }
}
