'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var dayjs = _interopDefault(require('moment'));

function getMonthViewStartDay(date, firstDay, mode) {
  var first = Number(firstDay);
  // get cur month start day obj from data
  var start = dayjs(date).startOf(mode);
  // let startTemp = dayjs(start.startOf(mode))
  // subtract the start day & cur month start day
  // start = start.subtract(startTemp.day(), 'day')
  // console.log(startTemp.day())

  // if (startTemp.day() < firstDay) {
  if (start.day() !== first) {
    // if start day back of the view's first day
    // view start should substrat a week
    start = start.subtract(start.day(), 'day');
  }

  // set final start day
  start = start.add(firstDay, 'day');
  return start;
}

var genBody = {
  methods: {
    genWeekTitle: function genWeekTitle(h) {
      var titleCls = this.prefixCls + '-week-title';
      var titleData = this.weekDateShort || this.weekLocaleData || this.localeData[this.locale];
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
  props: {
    renderHeader: Function
  },
  computed: {
    headerDateText: function headerDateText() {
      if (this.mode === 'week') {
        var startDay = dayjs(this.formatedDay).startOf('week').format('YYYY-MM-DD');
        var endDay = dayjs(this.formatedDay).endOf('week').format('YYYY-MM-DD');
        return startDay + ' - ' + endDay;
      } else {
        return dayjs(this.formatedDay).format('YYYY-MM');
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

      if (this.renderHeader) {
        return this.renderHeader({
          prev: this.prev,
          next: this.next,
          selectedDate: this.headerDateText
        });
      } else {
        return h('div', {
          class: [this.prefixCls + '-header-center']
        }, [prevControl, curMonth, nextControl]);
      }
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
      validator: function validator(value) {
        return value === 'month' || value === 'week';
      }
    },
    prefixCls: {
      type: String,
      default: prefixCls
    },
    weekDateShort: Array,
    onMonthChange: {
      type: Function,
      default: function _default() {
        return undefined;
      }
    },
    onPrev: {
      type: Function,
      default: function _default() {
        return undefined;
      }
    },
    onNext: {
      type: Function,
      default: function _default() {
        return undefined;
      }
    },
    renderHeader: Function,
    weekLocaleData: Array
  },
  computed: {
    formatedDay: function formatedDay() {
      return dayjs(new Date(this.currentDay));
    },
    monthData: function monthData() {
      var _this = this;

      var dateData = this.dateData,
          formatedDay = this.formatedDay,
          firstDay = this.firstDay,
          mode = this.mode,
          matchKey = this.matchKey;


      var dataType = checkType(dateData);

      if (!formatedDay) return [];

      var monthViewStartDate = getMonthViewStartDay(formatedDay, firstDay, mode);
      var monthData = [];
      var row = 6;

      if (this.mode === 'week') row = 1;

      var _loop = function _loop(day) {
        var data = [];
        if (dataType === '[object Object]') {
          Object.keys(dateData).forEach(function (item) {
            var date = item.replace('-', '/');
            if (monthViewStartDate.isSame(dayjs(new Date(date)))) {
              data.push(dateData[item]);
            }
          });
        } else if (dataType === '[object Array]') {
          data = dateData.filter(function (item) {
            var date = item[matchKey].replace('-', '/');
            return monthViewStartDate.isSame(dayjs(new Date(date)));
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

        monthViewStartDate = monthViewStartDate.add(1, 'day');
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
      var formatedDay = this.formatedDay,
          mode = this.mode,
          onPrev = this.onPrev,
          monthData = this.monthData;


      this.currentDay = formatedDay.subtract(1, mode).startOf(mode).format('YYYY-MM-DD');

      onPrev({
        startDay: monthData[0].date,
        endDay: monthData[monthData.length - 1].date
      });
    },
    next: function next() {
      var formatedDay = this.formatedDay,
          mode = this.mode,
          onNext = this.onNext,
          monthData = this.monthData;


      this.currentDay = formatedDay.add(1, mode).startOf(mode).format('YYYY-MM-DD');

      onNext({
        startDay: monthData[0].date,
        endDay: monthData[monthData.length - 1].date
      });
    },
    getItemStatus: function getItemStatus(date) {
      var tempDate = dayjs(date);
      var formatedDay = this.formatedDay;


      var isCurMonth = tempDate.month() === formatedDay.month();

      var isPrevMonth = !isCurMonth && tempDate.isBefore(this.formatedDay, 'month');
      var isNextMonth = !isCurMonth && tempDate.isAfter(this.formatedDay, 'month');

      var isPrevLastDay = isPrevMonth ? tempDate.isSame(tempDate.endOf('month').format('YYYY-MM-DD')) : false;
      var isNextFirstDay = isNextMonth ? tempDate.isSame(tempDate.startOf('month').format('YYYY-MM-DD')) : false;

      return {
        isPrevMonth: isPrevMonth,
        isPrevLastDay: isPrevLastDay,
        isNextMonth: isNextMonth,
        isNextFirstDay: isNextFirstDay,
        // isToday: date.isSame(dayjs(this.today), 'day'),
        isToday: date.format('YYYY-MM-DD') === dayjs(this.today).format('YYYY-MM-DD'),
        isCurMonth: isCurMonth
      };
    },
    changeViewData: function changeViewData() {
      this.onMonthChange({
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
          this.today = this.currentDay;
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
      today: this.currentDay,
      currentDay: null,
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
