import moment from 'moment';
import dateFunc from './date-func';
import genBody from './gen-body';
import genHeader from './gen-header';

const prefixCls = 'vue-calendar';

export default {
  name: prefixCls,
  mixins: [ genBody, genHeader, dateFunc ],
  props: {
    value: null,
    dateData: {
      type: Array,
      default: () => []
    },
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
        return value === 'month' || value === 'week';
      }
    },
    prefixCls: {
      type: String,
      default: prefixCls
    },
    onMonthChange: Function,
    onPrev: Function,
    onNext: Function
  },
  computed: {
    monthData() {
      const { dateData, currentDate, firstDay, mode } = this;
      if (!currentDate) return [];

      let monthViewStartDate = this.getMonthViewStartDay(currentDate, firstDay, mode);
      let monthData = [];
      let row = 6;

      if (this.mode === 'week') row = 1;

      for (let day = 0; day < (7 * row); day++) {
        const data = dateData.find(item => {
          return monthViewStartDate.isSame(this.moment(new Date(item[this.matchKey])), 'day');
        });

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
        });

        monthViewStartDate.add(1, 'day');
      }

      return monthData;
    }
  },
  methods: {
    prev() {
      this.currentDate = this.moment(this.currentDate).subtract(1, `${this.mode}s`).startOf(this.mode);
      this.onPrev && this.onPrev({
        startDay: this.monthData[0].date,
        endDay: this.monthData[this.monthData.length - 1].date
      });
    },
    next() {
      this.currentDate = this.moment(this.currentDate).add(1, `${this.mode}s`).startOf(this.mode);
      this.onNext && this.onNext({
        startDay: this.monthData[0].date,
        endDay: this.monthData[this.monthData.length - 1].date
      });
    },
    getItemStatus(date) {
      const isCurMonth = date.isSame(this.currentDate, 'month');
      let isPrevLastDay = false;
      let isNextFirstDay = false;

      const isPrevMonth = !isCurMonth && date.isBefore(this.currentDate, 'month');
      const isNextMonth = !isCurMonth && date.isAfter(this.currentDate, 'month');

      isPrevMonth && (isPrevLastDay = (date.isSame(this.moment(date).endOf('month').format('YYYY-MM-DD'))));
      isNextMonth && (isNextFirstDay = (date.isSame(this.moment(date).startOf('month').format('YYYY-MM-DD'))));

      return {
        isPrevMonth: isPrevMonth,
        isPrevLastDay: isPrevLastDay,
        isNextMonth: isNextMonth,
        isNextFirstDay: isNextFirstDay,
        isToday: date.isSame(this.moment(this.today), 'day'),
        isCurMonth: isCurMonth
      };
    },
    viewDataChage() {
      this.onMonthChange && this.onMonthChange({
        startDay: this.monthData[0].date,
        endDay: this.monthData[this.monthData.length - 1].date
      });
    }
  },
  watch: {
    value(val) {
      this.currentDate = this.moment(val);

      if (!this.today) {
        this.today = val;
      }
    },
    currentDate(val, oval) {
      if (val.isSame(oval, 'day')) return;
      this.$emit('input', val.format('YYYY-MM-DD'));

      this.viewDataChage();
    },
    mode(val) {
      this.viewDataChage();
    }
  },
  created() {
    // this.moment = moment.locale(this.locale);
    this.moment.locale(this.locale);
    this.currentDate = this.value || new Date();
  },
  data() {
    return {
      today: '',
      currentDate: null,
      moment: moment
    };
  },
  render(h) {
    return h('div', {
      class: [
        this.prefixCls
      ]
    }, [
      this.genHeader(h),
      this.genWeekTitle(h),
      this.genCalendateItem(h)
    ]);
  }
};
