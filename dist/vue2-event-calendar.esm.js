'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var dayjs = _interopDefault(require('dayjs'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function getMonthViewStartDay(date, firstDay, mode) {
  // get cur month start day obj from data
  var start = dayjs(date).startOf(mode);

  if (start.day() < firstDay) {
    // if start day behind of the view's first day,
    // start day should subtract a week -
    // to include all days of the month
    start = start.subtract(1, 'week');
  } // set final start day


  start = start.add(firstDay - start.day(), 'day');
  return start;
}

var CalendarHeader = {
  props: {
    prefixCls: {
      type: String,
      required: true
    },
    mode: String,
    firstDay: {
      required: true
    },
    renderHeader: Function,
    headerLeft: [Object, Array],
    headerRight: [Object, Array],
    currentDate: [Date, Object, String]
  },
  computed: {
    pre: function pre(vm) {
      return "".concat(vm.prefixCls, "-header");
    },
    headerDateText: function headerDateText() {
      var currentDate = this.currentDate,
          firstDay = this.firstDay,
          mode = this.mode;

      if (this.mode === 'week') {
        var startDate = getMonthViewStartDay(currentDate, firstDay, mode);
        var s = startDate.format('YYYY-MM-DD');
        var e = startDate.add(6, 'd').format('YYYY-MM-DD');
        return "".concat(s, " - ").concat(e);
      }

      return currentDate.format('YYYY-MM');
    },
    HeaderCenter: function HeaderCenter() {
      var h = this.$createElement;
      var p = this.$parent;
      var prev = p.prev,
          next = p.next;
      var prefixCls = this.prefixCls;
      var Content = this.renderHeader ? this.renderHeader({
        prev: prev,
        next: next,
        selectedDate: this.headerDateText
      }) : h("div", {
        "class": "".concat(prefixCls, "-header-center")
      }, [h("a", {
        "class": ["".concat(prefixCls, "-control"), "".concat(prefixCls, "-prev")],
        "on": {
          "click": prev
        }
      }, ['<']), h("span", {
        "class": "".concat(prefixCls, "-header-date")
      }, [this.headerDateText]), h("a", {
        "class": ["".concat(prefixCls, "-control"), "".concat(prefixCls, "-next")],
        "on": {
          "click": next
        }
      }, ['>'])]);
      return Content;
    }
  },
  render: function render() {
    var h = arguments[0];
    var prefixCls = this.prefixCls;
    return h("div", {
      "class": "".concat(prefixCls, "-header")
    }, [h("div", {
      "class": "".concat(prefixCls, "-header-left")
    }, [this.headerLeft]), this.HeaderCenter, h("div", {
      "class": "".concat(prefixCls, "-header-right")
    }, [this.headerRight])]);
  }
};

var DATE_FORMATE_STRING = 'YYYY/MM/DD';
var COL_NUM = 7;

var getVaildDate = function getVaildDate(date) {
  if (typeof date === 'string') {
    return new Date(date.replace(/-/g, '/'));
  }

  return date;
};

var script = {
  name: 'VueCalendar',
  components: {
    CalendarHeader: CalendarHeader
  },
  props: {
    prefixCls: {
      type: String,
      default: 'calendar'
    },
    startDate: [Number, String, Date],
    dateData: {
      type: [Object, Array],
      default: function _default() {
        return [];
      }
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
      validator: function validator(val) {
        return val === 'month' || val === 'week';
      }
    },
    weekDateShort: {
      type: Array,
      validator: function validator(val) {
        return val.length === 7;
      }
    },
    renderHeader: Function,
    weekLocaleData: Array
  },
  data: function data() {
    return {
      today: this.currentDay,
      rowNum: 6,
      currentDay: null
    };
  },
  computed: {
    localeData: function localeData() {
      return {
        'zh-cn': '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        en: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_')
      };
    },
    formatedDay: function formatedDay() {
      return dayjs(new Date(this.currentDay));
    },
    titleArray: function titleArray() {
      var arr = this.weekDateShort || this.weekLocaleData || this.localeData[this.locale];
      var i = this.firstDay - 1;
      return arr.map(function () {
        i += 1;

        if (i >= 7) {
          i = 0;
        }

        return arr[i];
      });
    },
    userData: function userData() {
      // get calendar data map
      // data model is:
      // {
      //   "2018/03/01": []
      // }
      var result = {};
      var dateData = this.dateData,
          matchKey = this.matchKey;

      if (Array.isArray(dateData)) {
        dateData.forEach(function (item) {
          var date = dayjs(getVaildDate(item[matchKey])).format(DATE_FORMATE_STRING);

          if (result[date]) {
            result[date].push(item);
          } else {
            result[date] = [item];
          }
        });
      } else {
        // object data
        Object.keys(dateData).forEach(function (key) {
          var date = dayjs(getVaildDate(key)).format(DATE_FORMATE_STRING);
          result[date] = [dateData[key]];
        });
      }

      return result;
    },
    monthData: function monthData() {
      var formatedDay = this.formatedDay,
          firstDay = this.firstDay,
          mode = this.mode,
          userData = this.userData,
          rowNum = this.rowNum;

      if (!formatedDay) {
        return [];
      } // start date of view, and it will be


      var startDate = getMonthViewStartDay(formatedDay, firstDay, mode);
      var monthData = []; // loop view item and get date data

      for (var row = 0; row < rowNum; row += 1) {
        for (var col = 0; col < COL_NUM; col += 1) {
          // init array
          if (!monthData[row]) monthData[row] = [];
          monthData[row].push(_objectSpread2({}, this.getItemStatus(startDate), {
            // data: data || [],
            data: userData[startDate.format(DATE_FORMATE_STRING)] || [],
            date: this.getDate(startDate)
          })); // increase date

          startDate = startDate.add(1, 'day');
        }
      }

      return monthData;
    }
  },
  watch: {
    startDate: {
      immediate: true,
      handler: function handler(val) {
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
      handler: function handler(val) {
        this.rowNum = val === 'week' ? 1 : 6;
        this.onMonthChange();
      }
    }
  },
  methods: {
    getItemStatus: function getItemStatus(date) {
      var tempDate = dayjs(date);
      var formatedDay = this.formatedDay;
      var isCurMonth = tempDate.month() === formatedDay.month();
      var isPrevMonth = !isCurMonth && tempDate.isBefore(this.formatedDay, 'month');
      var isNextMonth = !isCurMonth && tempDate.isAfter(this.formatedDay, 'month');
      var isPrevLastDay = isPrevMonth ? tempDate.isSame(tempDate.endOf('month')) : false;
      var isNextFirstDay = isNextMonth ? tempDate.isSame(tempDate.startOf('month')) : false;
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
    getDate: function getDate(date) {
      return {
        year: date.year(),
        month: date.month() + 1,
        date: date.date(),
        day: date.day(),
        full: date.format('YYYY-MM-DD')
      };
    },
    getEventArgs: function getEventArgs() {
      var d = this.monthData,
          formatedDay = this.formatedDay,
          rowNum = this.rowNum;
      return {
        startDate: d[0][0].date,
        endDay: d[rowNum - 1][COL_NUM - 1].date,
        now: this.getDate(formatedDay)
      };
    },
    onMonthChange: function onMonthChange() {
      this.$emit('onMonthChange', this.getEventArgs());
    },
    changeDate: function changeDate(date) {
      if (typeof date !== 'string' && Object.prototype.toString.call(date) !== '[object Date]') {
        /* tslint:disable: no-console */
        console.error('invalied date!');
        return;
      }

      this.currentDay = date;
    },
    prev: function prev() {
      var formatedDay = this.formatedDay,
          mode = this.mode;
      this.currentDay = formatedDay.subtract(1, mode).startOf(mode).format('YYYY-MM-DD');
      this.$emit('prev', this.getEventArgs());
    },
    next: function next() {
      var formatedDay = this.formatedDay,
          mode = this.mode;
      this.currentDay = formatedDay.add(1, mode).startOf(mode).format('YYYY-MM-DD');
      this.$emit('next', this.getEventArgs());
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: ["" + _vm.prefixCls, "is-" + _vm.mode] },
    [
      _c("calendar-header", {
        attrs: {
          mode: _vm.mode,
          "prefix-cls": _vm.prefixCls,
          "first-day": _vm.firstDay,
          "render-header": _vm.renderHeader,
          "header-left": _vm.$slots["header-left"],
          "header-right": _vm.$slots["header-right"],
          "current-date": _vm.formatedDay
        },
        on: { prev: _vm.prev, next: _vm.next }
      }),
      _vm._v(" "),
      _c(
        "div",
        { class: _vm.prefixCls + "-week" },
        _vm._l(_vm.titleArray, function(item) {
          return _c(
            "div",
            { key: item, class: _vm.prefixCls + "-week__item" },
            [_vm._v("\n      " + _vm._s(item) + "\n    ")]
          )
        }),
        0
      ),
      _vm._v(" "),
      _c(
        "div",
        { class: _vm.prefixCls + "-body" },
        [
          _vm._t(
            "body",
            [
              _c(
                "div",
                { class: _vm.prefixCls + "-body-grid" },
                _vm._l(_vm.monthData, function(row, index) {
                  return _c(
                    "div",
                    { key: index, class: _vm.prefixCls + "-body-row" },
                    [
                      _vm._l(row, function(col) {
                        return [
                          col
                            ? _c(
                                "div",
                                {
                                  key: col.date.full,
                                  class: _vm.prefixCls + "-day-item"
                                },
                                [
                                  _vm._t(
                                    "default",
                                    [
                                      _c("span", [
                                        _vm._v(_vm._s(col.date.date))
                                      ])
                                    ],
                                    { date: col }
                                  )
                                ],
                                2
                              )
                            : _vm._e()
                        ]
                      })
                    ],
                    2
                  )
                }),
                0
              )
            ],
            { data: _vm.monthData }
          )
        ],
        2
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-4c0eacc4_0", { source: "\n@import \"./style/calendar.css\";\n", map: {"version":3,"sources":["/Users/kit/Projects/resources/vue2-event-calendar/src/calendar.vue"],"names":[],"mappings":";AA4SA,8BAAA","file":"calendar.vue","sourcesContent":["<template>\n  <div :class=\"[`${prefixCls}`, `is-${mode}`]\">\n    <calendar-header\n      :mode=\"mode\"\n      :prefix-cls=\"prefixCls\"\n      :first-day=\"firstDay\"\n      :render-header=\"renderHeader\"\n      :header-left=\"$slots['header-left']\"\n      :header-right=\"$slots['header-right']\"\n      :current-date=\"formatedDay\"\n      @prev=\"prev\"\n      @next=\"next\" />\n\n    <div :class=\"`${prefixCls}-week`\">\n      <div v-for=\"item in titleArray\"\n        :key=\"item\"\n        :class=\"`${prefixCls}-week__item`\">\n        {{ item }}\n      </div>\n    </div>\n\n    <div :class=\"`${prefixCls}-body`\">\n      <slot name=\"body\" :data=\"monthData\">\n        <div :class=\"`${prefixCls}-body-grid`\">\n          <div v-for=\"(row, index) in monthData\"\n            :key=\"index\"\n            :class=\"`${prefixCls}-body-row`\">\n            <template v-for=\"col in row\">\n              <div :class=\"`${prefixCls}-day-item`\"\n                v-if=\"col\"\n                :key=\"col.date.full\">\n                <slot :date=\"col\">\n                  <span>{{ col.date.date }}</span>\n                </slot>\n              </div>\n            </template>\n          </div>\n        </div>\n      </slot>\n    </div>\n  </div>\n</template>\n\n<script>\nimport dayjs from 'dayjs';\nimport getMonthViewStartDay from './date-func';\nimport CalendarHeader from './header';\n\nconst DATE_FORMATE_STRING = 'YYYY/MM/DD';\nconst COL_NUM = 7;\nconst getVaildDate = (date) => {\n  if (typeof date === 'string') {\n    return new Date(date.replace(/-/g, '/'));\n  }\n  return date;\n};\n\nexport default {\n  name: 'VueCalendar',\n  components: {\n    CalendarHeader\n  },\n  props: {\n    prefixCls: {\n      type: String,\n      default: 'calendar'\n    },\n    startDate: [Number, String, Date],\n    dateData: {\n      type: [Object, Array],\n      default: () => []\n    },\n    matchKey: {\n      type: String,\n      default: 'date'\n    },\n    locale: {\n      type: String,\n      default: 'en'\n    },\n    firstDay: {\n      type: Number,\n      default: 0\n    },\n    mode: {\n      type: String,\n      default: 'month',\n      validator: val => val === 'month' || val === 'week'\n    },\n    weekDateShort: {\n      type: Array,\n      validator: val => val.length === 7\n    },\n    renderHeader: Function,\n    weekLocaleData: Array\n  },\n  data() {\n    return {\n      today: this.currentDay,\n      rowNum: 6,\n      currentDay: null\n    };\n  },\n  computed: {\n    localeData() {\n      return {\n        'zh-cn': '周日_周一_周二_周三_周四_周五_周六'.split('_'),\n        en: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_')\n      };\n    },\n\n    formatedDay() {\n      return dayjs(new Date(this.currentDay));\n    },\n\n    titleArray() {\n      const arr = this.weekDateShort || this.weekLocaleData || this.localeData[this.locale];\n      let i = this.firstDay - 1;\n\n      return arr.map(() => {\n        i += 1;\n        if (i >= 7) { i = 0; }\n\n        return arr[i];\n      });\n    },\n\n    userData() {\n      // get calendar data map\n      // data model is:\n      // {\n      //   \"2018/03/01\": []\n      // }\n      const result = {};\n      const { dateData, matchKey } = this;\n      if (Array.isArray(dateData)) {\n        dateData.forEach((item) => {\n          const date = dayjs(getVaildDate(item[matchKey])).format(DATE_FORMATE_STRING);\n          if (result[date]) {\n            result[date].push(item);\n          } else {\n            result[date] = [item];\n          }\n        });\n      } else {\n        // object data\n        Object.keys(dateData).forEach((key) => {\n          const date = dayjs(getVaildDate(key)).format(DATE_FORMATE_STRING);\n          result[date] = [dateData[key]];\n        });\n      }\n\n      return result;\n    },\n\n    monthData() {\n      const {\n        formatedDay,\n        firstDay,\n        mode,\n        userData,\n        rowNum\n      } = this;\n\n      if (!formatedDay) { return []; }\n\n      // start date of view, and it will be\n      let startDate = getMonthViewStartDay(\n        formatedDay,\n        firstDay,\n        mode,\n      );\n      const monthData = [];\n\n      // loop view item and get date data\n      for (let row = 0; row < rowNum; row += 1) {\n        for (let col = 0; col < COL_NUM; col += 1) {\n          // init array\n          if (!monthData[row]) monthData[row] = [];\n\n          monthData[row].push({\n            ...this.getItemStatus(startDate),\n            // data: data || [],\n            data: userData[startDate.format(DATE_FORMATE_STRING)] || [],\n            date: this.getDate(startDate)\n          });\n\n          // increase date\n          startDate = startDate.add(1, 'day');\n        }\n      }\n\n      return monthData;\n    }\n  },\n  watch: {\n    startDate: {\n      immediate: true,\n      handler(val) {\n        this.currentDay = val ? new Date(val) : new Date();\n        if (!this.today) this.today = this.currentDay;\n      }\n    },\n    currentDay: {\n      immediate: true,\n      handler: 'onMonthChange'\n    },\n    mode: {\n      immediate: true,\n      handler(val) {\n        this.rowNum = val === 'week' ? 1 : 6;\n        this.onMonthChange();\n      }\n    }\n  },\n  methods: {\n    getItemStatus(date) {\n      const tempDate = dayjs(date);\n      const {\n        formatedDay\n      } = this;\n\n      const isCurMonth = tempDate.month() === formatedDay.month();\n\n      const isPrevMonth = !isCurMonth && tempDate.isBefore(this.formatedDay, 'month');\n      const isNextMonth = !isCurMonth && tempDate.isAfter(this.formatedDay, 'month');\n\n      const isPrevLastDay = isPrevMonth ? tempDate.isSame(tempDate.endOf('month')) : false;\n      const isNextFirstDay = isNextMonth ? tempDate.isSame(tempDate.startOf('month')) : false;\n\n      return {\n        isPrevMonth,\n        isPrevLastDay,\n        isNextMonth,\n        isNextFirstDay,\n        // isToday: date.isSame(dayjs(this.today), 'day'),\n        isToday: date.format('YYYY-MM-DD') === dayjs(this.today).format('YYYY-MM-DD'),\n        isCurMonth\n      };\n    },\n\n    getDate(date) {\n      return {\n        year: date.year(),\n        month: date.month() + 1,\n        date: date.date(),\n        day: date.day(),\n        full: date.format('YYYY-MM-DD')\n      };\n    },\n\n    getEventArgs() {\n      const { monthData: d, formatedDay, rowNum } = this;\n      return {\n        startDate: d[0][0].date,\n        endDay: d[rowNum - 1][COL_NUM - 1].date,\n        now: this.getDate(formatedDay)\n      };\n    },\n\n    onMonthChange() {\n      this.$emit('onMonthChange', this.getEventArgs());\n    },\n\n    changeDate(date) {\n      if (typeof date !== 'string' && Object.prototype.toString.call(date) !== '[object Date]') {\n        /* tslint:disable: no-console */\n        console.error('invalied date!');\n        return;\n      }\n\n      this.currentDay = date;\n    },\n\n    prev() {\n      const { formatedDay, mode } = this;\n\n      this.currentDay = formatedDay\n        .subtract(1, mode)\n        .startOf(mode)\n        .format('YYYY-MM-DD');\n\n      this.$emit('prev', this.getEventArgs());\n    },\n\n    next() {\n      const { formatedDay, mode } = this;\n\n      this.currentDay = formatedDay\n        .add(1, mode)\n        .startOf(mode)\n        .format('YYYY-MM-DD');\n\n      this.$emit('next', this.getEventArgs());\n    }\n  }\n};\n</script>\n\n<style>\n@import \"./style/calendar.css\";\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

var index = {
  install: function install(Vue) {
    Vue.component(__vue_component__.name, __vue_component__);
  }
};

exports.Calendar = __vue_component__;
exports.default = index;
