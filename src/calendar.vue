<template>
  <div :class="[`${prefixCls}`, `is-${mode}`]">
    <calendar-header
      :mode="mode"
      :prefix-cls="prefixCls"
      :first-day="firstDay"
      :render-header="renderHeader"
      :header-left="$slots['header-left']"
      :header-right="$slots['header-right']"
      :current-date="formatedDay"
      @prev="prev"
      @next="next" />

    <div :class="`${prefixCls}-week`">
      <div v-for="item in titleArray"
        :key="item"
        :class="`${prefixCls}-week__item`">
        {{ item }}
      </div>
    </div>

    <div :class="`${prefixCls}-body`">
      <slot name="body" :data="monthData">
        <div :class="`${prefixCls}-body-grid`">
          <div v-for="(row, index) in monthData"
            :key="index"
            :class="`${prefixCls}-body-row`">
            <template v-for="col in row">
              <div :class="`${prefixCls}-day-item`"
                v-if="col"
                :key="col.date.full">
                <slot :date="col">
                  <span>{{ col.date.date }}</span>
                </slot>
              </div>
            </template>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import getMonthViewStartDay from './date-func';
import CalendarHeader from './header';

const DATE_FORMATE_STRING = 'YYYY/MM/DD';
const COL_NUM = 7;
const getVaildDate = date => new Date(date.replace(/-/g, '/'));

export default {
  name: 'VueCalendar',
  components: {
    CalendarHeader
  },
  props: {
    prefixCls: {
      type: String,
      default: 'calendar'
    },
    startDate: [Number, String, Date],
    dateData: {
      type: [Object, Array],
      default: () => []
    },
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
      validator: val => val === 'month' || val === 'week'
    },
    weekDateShort: {
      type: Array,
      validator: val => val.length === 7
    },
    renderHeader: Function,
    weekLocaleData: Array
  },
  data() {
    return {
      today: this.currentDay,
      rowNum: 6,
      currentDay: null
    };
  },
  computed: {
    localeData() {
      return {
        'zh-cn': '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        en: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_')
      };
    },

    formatedDay() {
      return dayjs(new Date(this.currentDay));
    },

    titleArray() {
      const arr = this.weekDateShort || this.weekLocaleData || this.localeData[this.locale];
      let i = this.firstDay - 1;

      return arr.map(() => {
        i += 1;
        if (i >= 7) { i = 0; }

        return arr[i];
      });
    },

    userData() {
      // get calendar data map
      // data model is:
      // {
      //   "2018/03/01": []
      // }
      const result = {};
      const { dateData, matchKey } = this;
      if (Array.isArray(dateData)) {
        dateData.forEach((item) => {
          const date = dayjs(getVaildDate(item[matchKey])).format(DATE_FORMATE_STRING);
          if (result[date]) {
            result[date].push(item);
          } else {
            result[date] = [item];
          }
        });
      } else {
        // object data
        Object.keys(dateData).forEach((key) => {
          const date = dayjs(getVaildDate(key)).format(DATE_FORMATE_STRING);
          result[date] = [dateData[key]];
        });
      }

      return result;
    },

    monthData() {
      const {
        formatedDay,
        firstDay,
        mode,
        userData,
        rowNum
      } = this;

      if (!formatedDay) { return []; }

      // start date of view, and it will be
      let startDate = getMonthViewStartDay(
        formatedDay,
        firstDay,
        mode,
      );
      const monthData = [];

      // loop view item and get date data
      for (let row = 0; row < rowNum; row += 1) {
        for (let col = 0; col < COL_NUM; col += 1) {
          // init array
          if (!monthData[row]) monthData[row] = [];

          monthData[row].push({
            ...this.getItemStatus(startDate),
            // data: data || [],
            data: userData[startDate.format(DATE_FORMATE_STRING)] || [],
            date: this.getDate(startDate)
          });

          // increase date
          startDate = startDate.add(1, 'day');
        }
      }

      return monthData;
    }
  },
  watch: {
    startDate: {
      immediate: true,
      handler(val) {
        this.currentDay = val ? new Date(val) : new Date();
        if (!this.today) this.today = this.currentDay;
      }
    },
    currentDay: {
      immediate: true,
      handler: 'onMonthChange'
    },
    mode: {
      immediate: true,
      handler(val) {
        this.rowNum = val === 'week' ? 1 : 6;
        this.onMonthChange();
      }
    }
  },
  methods: {
    getItemStatus(date) {
      const tempDate = dayjs(date);
      const {
        formatedDay
      } = this;

      const isCurMonth = tempDate.month() === formatedDay.month();

      const isPrevMonth = !isCurMonth && tempDate.isBefore(this.formatedDay, 'month');
      const isNextMonth = !isCurMonth && tempDate.isAfter(this.formatedDay, 'month');

      const isPrevLastDay = isPrevMonth ? tempDate.isSame(tempDate.endOf('month')) : false;
      const isNextFirstDay = isNextMonth ? tempDate.isSame(tempDate.startOf('month')) : false;

      return {
        isPrevMonth,
        isPrevLastDay,
        isNextMonth,
        isNextFirstDay,
        // isToday: date.isSame(dayjs(this.today), 'day'),
        isToday: date.format('YYYY-MM-DD') === dayjs(this.today).format('YYYY-MM-DD'),
        isCurMonth
      };
    },

    getDate(date) {
      return {
        year: date.year(),
        month: date.month() + 1,
        date: date.date(),
        day: date.day(),
        full: date.format('YYYY-MM-DD')
      };
    },

    getEventArgs() {
      const { monthData: d, formatedDay, rowNum } = this;
      return {
        startDate: d[0][0].date,
        endDay: d[rowNum - 1][COL_NUM - 1].date,
        now: this.getDate(formatedDay)
      };
    },

    onMonthChange() {
      this.$emit('onMonthChange', this.getEventArgs());
    },

    changeDate(date) {
      if (typeof date !== 'string' && Object.prototype.toString.call(date) !== '[object Date]') {
        /* tslint:disable: no-console */
        console.error('invalied date!');
        return;
      }

      this.currentDay = date;
    },

    prev() {
      const { formatedDay, mode } = this;

      this.currentDay = formatedDay
        .subtract(1, mode)
        .startOf(mode)
        .format('YYYY-MM-DD');

      this.$emit('prev', this.getEventArgs());
    },

    next() {
      const { formatedDay, mode } = this;

      this.currentDay = formatedDay
        .add(1, mode)
        .startOf(mode)
        .format('YYYY-MM-DD');

      this.$emit('next', this.getEventArgs());
    }
  }
};
</script>

<style>
@import "./style/calendar.css";
</style>
