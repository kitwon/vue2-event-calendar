'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var dayjs_min = createCommonjsModule(function (module, exports) {
  !function (t, e) {
    module.exports = e();
  }(commonjsGlobal, function () {
    var t = "second",
        e = "minute",
        n = "hour",
        s = "day",
        r = "week",
        i = "month",
        a = "year",
        u = "Sunday.Monday.Tuesday.Wednesday.Thursday.Friday.Saturday".split("."),
        c = "January.February.March.April.May.June.July.August.September.October.November.December".split("."),
        h = /^(\d{4})-?(\d{2})-?(\d{1,2})(.*(\d{2}):(\d{2}):(\d{2}))?.?(\d{3})?$/,
        o = /\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
        $ = function $(t, e, n) {
      var s = String(t);return !s || s.length >= e ? t : "" + Array(e + 1 - s.length).join(n) + t;
    },
        d = function d(t) {
      return t && String(t).toLowerCase().replace(/s$/, "");
    },
        f = function f(t) {
      return void 0 === t;
    },
        l = function l(t) {
      var e;return null === t ? new Date(NaN) : f(t) ? new Date() : t instanceof Date ? t : (e = String(t).match(h)) ? new Date(e[1], e[2] - 1, e[3], e[5], e[6], e[7], e[8] || 0) : new Date(t);
    },
        m = function () {
      function h(t) {
        this.$d = l(t), this.init();
      }var m = h.prototype;return m.init = function () {
        var t, e, n, s, r;this.$zone = this.$d.getTimezoneOffset(), this.$zoneStr = (t = this.$zone, e = Math.abs(t), n = t <= 0 ? "+" : "-", s = Math.floor(e / 60), r = e % 60, "" + n + $(s, 2, "0") + ":" + $(r, 2, "0")), this.$y = this.$d.getFullYear(), this.$M = this.$d.getMonth(), this.$D = this.$d.getDate(), this.$W = this.$d.getDay(), this.$H = this.$d.getHours(), this.$m = this.$d.getMinutes(), this.$s = this.$d.getSeconds(), this.$ms = this.$d.getMilliseconds();
      }, m.isValid = function () {
        return !("Invalid Date" === this.$d.toString());
      }, m.isLeapYear = function () {
        return this.$y % 4 == 0 && this.$y % 100 != 0 || this.$y % 400 == 0;
      }, m.isSame = function (t) {
        return this.valueOf() === t.valueOf();
      }, m.isBefore = function (t) {
        return this.valueOf() < t.valueOf();
      }, m.isAfter = function (t) {
        return this.valueOf() > t.valueOf();
      }, m.year = function () {
        return this.$y;
      }, m.month = function () {
        return this.$M;
      }, m.day = function () {
        return this.$W;
      }, m.date = function () {
        return this.$D;
      }, m.hour = function () {
        return this.$H;
      }, m.minute = function () {
        return this.$m;
      }, m.second = function () {
        return this.$s;
      }, m.millisecond = function () {
        return this.$ms;
      }, m.unix = function () {
        return Math.floor(this.valueOf() / 1e3);
      }, m.valueOf = function () {
        return this.$d.getTime();
      }, m.startOf = function (u, c) {
        var o = this,
            $ = !!f(c) || c,
            l = function l(t, e, n) {
          void 0 === n && (n = o.$y);var r = new h(new Date(n, e, t));return $ ? r : r.endOf(s);
        },
            m = function m(t, e) {
          return new h(o.toDate()[t].apply(o.toDate(), $ ? [0, 0, 0, 0].slice(e) : [23, 59, 59, 999].slice(e)));
        };switch (d(u)) {case a:
            return $ ? l(1, 0) : l(31, 11, this.$y);case i:
            return $ ? l(1, this.$M) : l(0, this.$M + 1, this.$y);case r:
            return $ ? l(this.$D - this.$W, this.$M) : l(this.$D + (6 - this.$W), this.$M, this.$y);case s:case "date":
            return m("setHours", 0);case n:
            return m("setMinutes", 1);case e:
            return m("setSeconds", 2);case t:
            return m("setMilliseconds", 3);default:
            return this.clone();}
      }, m.endOf = function (t) {
        return this.startOf(t, !1);
      }, m.mSet = function (s, r) {
        switch (d(s)) {case "date":
            this.$d.setDate(r);break;case i:
            this.$d.setMonth(r);break;case a:
            this.$d.setFullYear(r);break;case n:
            this.$d.setHours(r);break;case e:
            this.$d.setMinutes(r);break;case t:
            this.$d.setSeconds(r);break;case "millisecond":
            this.$d.setMilliseconds(r);}return this.init(), this;
      }, m.set = function (t, e) {
        return this.clone().mSet(t, e);
      }, m.add = function (t, u) {
        var c,
            o = u && 1 === u.length ? u : d(u);if (["M", i].indexOf(o) > -1) {
          var $ = this.set("date", 1).set(i, this.$M + t);return $ = $.set("date", Math.min(this.$D, $.daysInMonth()));
        }if (["y", a].indexOf(o) > -1) return this.set(a, this.$y + t);switch (o) {case "m":case e:
            c = 6e4;break;case "h":case n:
            c = 36e5;break;case "d":case s:
            c = 864e5;break;case "w":case r:
            c = 6048e5;break;default:
            c = 1e3;}return new h(this.valueOf() + t * c);
      }, m.subtract = function (t, e) {
        return this.add(-1 * t, e);
      }, m.format = function (t) {
        var e = this;return (t || "YYYY-MM-DDTHH:mm:ssZ").replace(o, function (t) {
          if (t.indexOf("[") > -1) return t.replace(/\[|\]/g, "");switch (t) {case "YY":
              return String(e.$y).slice(-2);case "YYYY":
              return String(e.$y);case "M":
              return String(e.$M + 1);case "MM":
              return $(e.$M + 1, 2, "0");case "MMM":
              return c[e.$M].slice(0, 3);case "MMMM":
              return c[e.$M];case "D":
              return String(e.$D);case "DD":
              return $(e.$D, 2, "0");case "d":
              return String(e.$W);case "dddd":
              return u[e.$W];case "H":
              return String(e.$H);case "HH":
              return $(e.$H, 2, "0");case "h":case "hh":
              return 0 === e.$H ? 12 : $(e.$H < 13 ? e.$H : e.$H - 12, "hh" === t ? 2 : 1, "0");case "a":
              return e.$H < 12 ? "am" : "pm";case "A":
              return e.$H < 12 ? "AM" : "PM";case "m":
              return String(e.$m);case "mm":
              return $(e.$m, 2, "0");case "s":
              return String(e.$s);case "ss":
              return $(e.$s, 2, "0");case "SSS":
              return $(e.$ms, 3, "0");case "Z":
              return e.$zoneStr;default:
              return e.$zoneStr.replace(":", "");}
        });
      }, m.diff = function (e, n, u) {
        var c,
            o,
            $,
            f,
            l,
            m,
            M = d(n),
            y = e instanceof h ? e : new h(e),
            S = this - y,
            g = (c = this, f = 12 * ((o = y).year() - c.year()) + (o.month() - c.month()), l = c.clone().add(f, "months"), $ = o - l < 0 ? (o - l) / (l - c.clone().add(f - 1, "months")) : (o - l) / (c.clone().add(f + 1, "months") - l), Number(-(f + $)));switch (M) {case a:
            g /= 12;break;case i:
            break;case "quarter":
            g /= 3;break;case r:
            g = S / 6048e5;break;case s:
            g = S / 864e5;break;case t:
            g = S / 1e3;break;default:
            g = S;}return u ? g : (m = g) < 0 ? Math.ceil(m) || 0 : Math.floor(m);
      }, m.daysInMonth = function () {
        return this.endOf(i).$D;
      }, m.clone = function () {
        return new h(this);
      }, m.toDate = function () {
        return new Date(this.$d);
      }, m.toArray = function () {
        return [this.$y, this.$M, this.$D, this.$H, this.$m, this.$s, this.$ms];
      }, m.toJSON = function () {
        return this.toISOString();
      }, m.toISOString = function () {
        return this.toDate().toISOString();
      }, m.toObject = function () {
        return { years: this.$y, months: this.$M, date: this.$D, hours: this.$H, minutes: this.$m, seconds: this.$s, milliseconds: this.$ms };
      }, m.toString = function () {
        return this.$d.toUTCString();
      }, h;
    }();return function (t) {
      return new m(t);
    };
  });
});

function getMonthViewStartDay(date, firstDay, mode) {
  var first = Number(firstDay);
  // get cur month start day obj from data
  var start = dayjs_min(date).startOf(mode);
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
        var startDay = dayjs_min(this.formatedDay).startOf('week').format('YYYY-MM-DD');
        var endDay = dayjs_min(this.formatedDay).endOf('week').format('YYYY-MM-DD');
        return startDay + ' - ' + endDay;
      } else {
        return dayjs_min(this.formatedDay).format('YYYY-MM');
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
      return dayjs_min(new Date(this.currentDay));
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
            if (monthViewStartDate.isSame(dayjs_min(new Date(date)))) {
              data.push(dateData[item]);
            }
          });
        } else if (dataType === '[object Array]') {
          data = dateData.filter(function (item) {
            var date = item[matchKey].replace('-', '/');
            return monthViewStartDate.isSame(dayjs_min(new Date(date)));
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
      var tempDate = dayjs_min(date);
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
        isToday: date.format('YYYY-MM-DD') === dayjs_min(this.today).format('YYYY-MM-DD'),
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
