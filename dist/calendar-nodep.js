'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var moment = _interopDefault(require('moment'));

var dateFunc = {
  methods: {
    getMonthViewStartDay: function getMonthViewStartDay(date, firstDay, mode) {
      firstDay = parseInt(firstDay);
      // get cur month start day obj from data
      var start = this.moment(date);
      var startTemp = this.moment(start.startOf(mode));
      // subtract the start day & cur month start day
      // if cur day is Wed, the view start day should substract 2
      start.subtract(startTemp.day(), 'days');

      if (startTemp.day() < firstDay) {
        // if start day back of the view's first day
        // view start should substrat a week
        start.subtract(7, 'days');
      }

      // set final start day
      start.add(firstDay, 'days');
      return start;
    },
    getMonthViewEndDay: function getMonthViewEndDay(date) {
      return this.getMonthViewStartDay().add(6, 'weeks');
    }
  }
};

var genBody = {
  methods: {
    genWeekTitle: function genWeekTitle(h) {
      var titleCls = this.prefixCls + '-week-title';
      var titleData = this.weekDateShort || this.localeData[this.locale];
      var temp = this.firstDay - 1;

      var titleArr = titleData.map(function (date) {
        if (++temp >= 7) temp = 0;

        return h('div', {
          class: [titleCls + '-item']
        }, [titleData[temp]]);
      });

      return h('div', {
        class: [titleCls]
      }, [titleArr]);
    },
    genCalendateItem: function genCalendateItem(h) {
      var _this = this;

      var tempRow = this.genItemRow(h);
      var itemArr = [];

      this.monthData.map(function (data, index) {
        var item = h('div', {
          class: _this.prefixCls + '-day-item'
        }, [_this.$scopedSlots.default ? _this.$scopedSlots.default(data) : _this.$slots.default]);

        tempRow.children.push(item);

        if (index - 1 > 0 && (index + 1) % 7 === 0) {
          itemArr.push(tempRow);
          tempRow = _this.genItemRow(h);
        }
      });

      return h('div', {
        class: [this.prefixCls + '-body']
      }, [itemArr]);
    },
    genItemRow: function genItemRow(h) {
      var itemRow = h('div', {
        class: [this.prefixCls + '-body-row']
      }, []);
      return itemRow;
    }
  }
};

var genHeader = {
  computed: {
    headerDateText: function headerDateText() {
      if (this.mode === 'week') {
        var startDay = this.moment(this.formatedDay).startOf('week').format('YYYY-MM-DD');
        var endDay = this.moment(this.formatedDay).endOf('week').format('YYYY-MM-DD');
        return startDay + ' - ' + endDay;
      } else {
        return this.moment(this.formatedDay).format('YYYY-MM');
      }
    }
  },
  methods: {
    genHeaderCenter: function genHeaderCenter(h) {
      var prevControl = h('a', {
        class: [this.prefixCls + '-control', this.prefixCls + '-prev'],
        on: {
          click: this.prev
        }
      }, [this.prevNode || '<']);

      var nextControl = h('a', {
        class: [this.prefixCls + '-control', this.prefixCls + '-next'],
        on: {
          click: this.next
        }
      }, [this.nextNode || '>']);

      var curMonth = h('span', {
        class: [this.prefixCls + '-header-date']
      }, [this.headerDateText]);

      return h('div', {
        class: [this.prefixCls + '-header-center']
      }, [prevControl, curMonth, nextControl]);
    },
    genHeader: function genHeader(h) {
      var headerLeft = h('div', {
        class: [this.prefixCls + '-header-left']
      }, [this.$slots['header-left']]);

      var headerRight = h('div', {
        class: [this.prefixCls + '-header-right']
      }, [this.$slots['header-right']]);

      return h('div', {
        class: [this.prefixCls + '-header']
      }, [headerLeft, this.genHeaderCenter(h), headerRight]);
    }
  }
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var prefixCls = 'vue-calendar';

function checkType(data) {
  return Object.prototype.toString.call(data);
}

var calendar$1 = {
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
      validator: function validator(value) {
        return value === 'month' || value === 'week';
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
    formatedDay: function formatedDay() {
      return this.moment(this.currentDay);
    },
    monthData: function monthData() {
      var _this = this;

      var dateData = this.dateData,
          formatedDay = this.formatedDay,
          firstDay = this.firstDay,
          mode = this.mode;

      var dataType = checkType(dateData);

      if (!formatedDay) return [];

      var monthViewStartDate = this.getMonthViewStartDay(formatedDay, firstDay, mode);
      var monthData = [];
      var row = 6;

      if (this.mode === 'week') row = 1;

      var _loop = function _loop(day) {
        var data = [];
        if (dataType === '[object Object]') {
          Object.keys(dateData).forEach(function (item) {
            if (monthViewStartDate.isSame(_this.moment(new Date(item)), 'day')) {
              data.push(dateData[item]);
            }
          });
        } else if (dataType === '[object Array]') {
          data = dateData.filter(function (item) {
            return monthViewStartDate.isSame(_this.moment(new Date(item[_this.matchKey])), 'day');
          });
        }

        monthData.push(_extends({}, _this.getItemStatus(monthViewStartDate), {
          data: data || {},
          date: {
            year: monthViewStartDate.year(),
            month: monthViewStartDate.month() + 1,
            date: monthViewStartDate.date(),
            day: monthViewStartDate.day(),
            full: monthViewStartDate.format('YYYY-MM-DD')
          }
        }));

        monthViewStartDate.add(1, 'day');
      };

      for (var day = 0; day < 7 * row; day++) {
        _loop(day);
      }

      return monthData;
    }
  },
  methods: {
    changeDate: function changeDate(date) {
      if (typeof date !== 'string' && Object.prototype.toString.call(date) !== '[object Date]') {
        console.error('invalied date!');
        return false;
      }

      this.currentDay = date;
    },
    prev: function prev() {
      this.currentDay = this.formatedDay.subtract(1, this.mode + 's').startOf(this.mode).format('YYYY-MM-DD');

      this.onPrev && this.onPrev({
        startDay: this.monthData[0].date,
        endDay: this.monthData[this.monthData.length - 1].date
      });
    },
    next: function next() {
      this.currentDay = this.formatedDay.add(1, this.mode + 's').startOf(this.mode).format('YYYY-MM-DD');

      this.onNext && this.onNext({
        startDay: this.monthData[0].date,
        endDay: this.monthData[this.monthData.length - 1].date
      });
    },
    getItemStatus: function getItemStatus(date) {
      var isCurMonth = date.isSame(this.formatedDay, 'month');
      var isPrevLastDay = false;
      var isNextFirstDay = false;

      var isPrevMonth = !isCurMonth && date.isBefore(this.formatedDay, 'month');
      var isNextMonth = !isCurMonth && date.isAfter(this.formatedDay, 'month');

      isPrevMonth && (isPrevLastDay = date.isSame(this.moment(date).endOf('month').format('YYYY-MM-DD')));
      isNextMonth && (isNextFirstDay = date.isSame(this.moment(date).startOf('month').format('YYYY-MM-DD')));

      return {
        isPrevMonth: isPrevMonth,
        isPrevLastDay: isPrevLastDay,
        isNextMonth: isNextMonth,
        isNextFirstDay: isNextFirstDay,
        isToday: date.isSame(this.moment(this.today), 'day'),
        isCurMonth: isCurMonth
      };
    },
    changeViewData: function changeViewData() {
      this.onMonthChange && this.onMonthChange({
        startDay: this.monthData[0].date,
        endDay: this.monthData[this.monthData.length - 1].date
      });
    }
  },
  watch: {
    startDate: {
      immediate: true,
      handler: function handler(val) {
        this.currentDay = val ? new Date(val) : new Date();

        if (!this.today) {
          this.today = val;
        }
      }
    },
    currentDay: {
      immediate: true,
      handler: function handler(val, oval) {
        // if (val.isSame(oval, 'day')) return
        // this.$emit('input', val.format('YYYY-MM-DD'))

        this.changeViewData();
      }
    },
    mode: function mode(val) {
      this.changeViewData();
    }
  },
  data: function data() {
    return {
      today: '',
      currentDay: null,
      moment: moment,
      localeData: {
        'zh-cn': '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        'en': 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_')
      }
    };
  },
  render: function render(h) {
    return h('div', {
      class: [this.prefixCls, 'is-' + this.mode]
    }, [this.genHeader(h), this.genWeekTitle(h), this.genCalendateItem(h)]);
  }
};

module.exports = calendar$1;
