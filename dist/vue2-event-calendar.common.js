module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "4b8b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "5a0c":
/***/ (function(module, exports, __webpack_require__) {

!function(t,n){ true?module.exports=n():undefined}(this,function(){"use strict";var t="millisecond",n="second",e="minute",r="hour",i="day",s="week",u="month",o="quarter",a="year",h=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c=function(t,n,e){var r=String(t);return!r||r.length>=n?t:""+Array(n+1-r.length).join(e)+t},d={s:c,z:function(t){var n=-t.utcOffset(),e=Math.abs(n),r=Math.floor(e/60),i=e%60;return(n<=0?"+":"-")+c(r,2,"0")+":"+c(i,2,"0")},m:function(t,n){var e=12*(n.year()-t.year())+(n.month()-t.month()),r=t.clone().add(e,u),i=n-r<0,s=t.clone().add(e+(i?-1:1),u);return Number(-(e+(n-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:a,w:s,d:i,h:r,m:e,s:n,ms:t,Q:o}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},l="en",m={};m[l]=$;var y=function(t){return t instanceof v},M=function(t,n,e){var r;if(!t)return null;if("string"==typeof t)m[t]&&(r=t),n&&(m[t]=n,r=t);else{var i=t.name;m[i]=t,r=i}return e||(l=r),r},g=function(t,n,e){if(y(t))return t.clone();var r=n?"string"==typeof n?{format:n,pl:e}:n:{};return r.date=t,new v(r)},D=d;D.l=M,D.i=y,D.w=function(t,n){return g(t,{locale:n.$L,utc:n.$u})};var v=function(){function c(t){this.$L=this.$L||M(t.locale,null,!0)||l,this.parse(t)}var d=c.prototype;return d.parse=function(t){this.$d=function(t){var n=t.date,e=t.utc;if(null===n)return new Date(NaN);if(D.u(n))return new Date;if(n instanceof Date)return new Date(n);if("string"==typeof n&&!/Z$/i.test(n)){var r=n.match(h);if(r)return e?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(n)}(t),this.init()},d.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},d.$utils=function(){return D},d.isValid=function(){return!("Invalid Date"===this.$d.toString())},d.isSame=function(t,n){var e=g(t);return this.startOf(n)<=e&&e<=this.endOf(n)},d.isAfter=function(t,n){return g(t)<this.startOf(n)},d.isBefore=function(t,n){return this.endOf(n)<g(t)},d.$g=function(t,n,e){return D.u(t)?this[n]:this.set(e,t)},d.year=function(t){return this.$g(t,"$y",a)},d.month=function(t){return this.$g(t,"$M",u)},d.day=function(t){return this.$g(t,"$W",i)},d.date=function(t){return this.$g(t,"$D","date")},d.hour=function(t){return this.$g(t,"$H",r)},d.minute=function(t){return this.$g(t,"$m",e)},d.second=function(t){return this.$g(t,"$s",n)},d.millisecond=function(n){return this.$g(n,"$ms",t)},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,o){var h=this,f=!!D.u(o)||o,c=D.p(t),d=function(t,n){var e=D.w(h.$u?Date.UTC(h.$y,n,t):new Date(h.$y,n,t),h);return f?e:e.endOf(i)},$=function(t,n){return D.w(h.toDate()[t].apply(h.toDate(),(f?[0,0,0,0]:[23,59,59,999]).slice(n)),h)},l=this.$W,m=this.$M,y=this.$D,M="set"+(this.$u?"UTC":"");switch(c){case a:return f?d(1,0):d(31,11);case u:return f?d(1,m):d(0,m+1);case s:var g=this.$locale().weekStart||0,v=(l<g?l+7:l)-g;return d(f?y-v:y+(6-v),m);case i:case"date":return $(M+"Hours",0);case r:return $(M+"Minutes",1);case e:return $(M+"Seconds",2);case n:return $(M+"Milliseconds",3);default:return this.clone()}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(s,o){var h,f=D.p(s),c="set"+(this.$u?"UTC":""),d=(h={},h[i]=c+"Date",h.date=c+"Date",h[u]=c+"Month",h[a]=c+"FullYear",h[r]=c+"Hours",h[e]=c+"Minutes",h[n]=c+"Seconds",h[t]=c+"Milliseconds",h)[f],$=f===i?this.$D+(o-this.$W):o;if(f===u||f===a){var l=this.clone().set("date",1);l.$d[d]($),l.init(),this.$d=l.set("date",Math.min(this.$D,l.daysInMonth())).toDate()}else d&&this.$d[d]($);return this.init(),this},d.set=function(t,n){return this.clone().$set(t,n)},d.get=function(t){return this[D.p(t)]()},d.add=function(t,o){var h,f=this;t=Number(t);var c=D.p(o),d=function(n){var e=g(f);return D.w(e.date(e.date()+Math.round(n*t)),f)};if(c===u)return this.set(u,this.$M+t);if(c===a)return this.set(a,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(h={},h[e]=6e4,h[r]=36e5,h[n]=1e3,h)[c]||1,l=this.valueOf()+t*$;return D.w(l,this)},d.subtract=function(t,n){return this.add(-1*t,n)},d.format=function(t){var n=this;if(!this.isValid())return"Invalid Date";var e=t||"YYYY-MM-DDTHH:mm:ssZ",r=D.z(this),i=this.$locale(),s=this.$H,u=this.$m,o=this.$M,a=i.weekdays,h=i.months,c=function(t,r,i,s){return t&&(t[r]||t(n,e))||i[r].substr(0,s)},d=function(t){return D.s(s%12||12,t,"0")},$=i.meridiem||function(t,n,e){var r=t<12?"AM":"PM";return e?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:c(i.monthsShort,o,h,3),MMMM:h[o]||h(this,e),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,a,2),ddd:c(i.weekdaysShort,this.$W,a,3),dddd:a[this.$W],H:String(s),HH:D.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:D.s(u,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:r};return e.replace(f,function(t,n){return n||l[t]||r.replace(":","")})},d.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},d.diff=function(t,h,f){var c,d=D.p(h),$=g(t),l=6e4*($.utcOffset()-this.utcOffset()),m=this-$,y=D.m(this,$);return y=(c={},c[a]=y/12,c[u]=y,c[o]=y/3,c[s]=(m-l)/6048e5,c[i]=(m-l)/864e5,c[r]=m/36e5,c[e]=m/6e4,c[n]=m/1e3,c)[d]||m,f?y:D.a(y)},d.daysInMonth=function(){return this.endOf(u).$D},d.$locale=function(){return m[this.$L]},d.locale=function(t,n){if(!t)return this.$L;var e=this.clone();return e.$L=M(t,n,!0),e},d.clone=function(){return D.w(this.toDate(),this)},d.toDate=function(){return new Date(this.$d)},d.toJSON=function(){return this.toISOString()},d.toISOString=function(){return this.$d.toISOString()},d.toString=function(){return this.$d.toUTCString()},c}();return g.prototype=v.prototype,g.extend=function(t,n){return t(n,v,g),g},g.locale=M,g.isDayjs=y,g.unix=function(t){return g(1e3*t)},g.en=m[l],g.Ls=m,g});


/***/ }),

/***/ "cda2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_calendar_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4b8b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_calendar_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_calendar_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_calendar_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5d2a8af6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/calendar.vue?vue&type=template&id=1bbc2648&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[("" + _vm.prefixCls), ("is-" + _vm.mode)]},[_c('calendar-header',{attrs:{"mode":_vm.mode,"prefix-cls":_vm.prefixCls,"first-day":_vm.firstDay,"render-header":_vm.renderHeader,"header-left":_vm.$slots['header-left'],"header-right":_vm.$slots['header-right'],"current-date":_vm.formatedDay},on:{"prev":_vm.prev,"next":_vm.next}}),_c('div',{class:(_vm.prefixCls + "-week")},_vm._l((_vm.titleArray),function(item){return _c('div',{key:item,class:(_vm.prefixCls + "-week__item")},[_vm._v("\n      "+_vm._s(item)+"\n    ")])}),0),_c('div',{class:(_vm.prefixCls + "-body")},[_vm._t("body",[_c('div',{class:(_vm.prefixCls + "-body-grid")},_vm._l((_vm.monthData),function(row,index){return _c('div',{key:index,class:(_vm.prefixCls + "-body-row")},[_vm._l((row),function(col){return [(col)?_c('div',{key:col.date.full,class:(_vm.prefixCls + "-day-item")},[_vm._t("default",[_c('span',[_vm._v(_vm._s(col.date.date))])],{"date":col})],2):_vm._e()]})],2)}),0)],{"data":_vm.monthData})],2)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/calendar.vue?vue&type=template&id=1bbc2648&

// EXTERNAL MODULE: ./node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__("5a0c");
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);

// CONCATENATED MODULE: ./src/date-func.js

function getMonthViewStartDay(date, firstDay, mode) {
  // get cur month start day obj from data
  var start = dayjs_min_default()(date).startOf(mode); // let startTemp = dayjs(start.startOf(mode))
  // subtract the start day & cur month start day
  // start = start.subtract(startTemp.day(), 'day')
  // console.log(startTemp.day())

  if (start.day() < firstDay) {
    // if start day behind of the view's first day,
    // start day should subtract a week -
    // to include all days of the month
    start = start.subtract(1, 'week');
  } // set final start day


  start = start.add(firstDay - start.day(), 'day');
  return start;
} // export function getMonthViewEndDay() {
//   return getMonthViewStartDay().add(6, 'week');
// }
// CONCATENATED MODULE: ./src/header.js

/* harmony default export */ var header = ({
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
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/calendar.vue?vue&type=script&lang=js&
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var DATE_FORMATE_STRING = 'YYYY/MM/DD';
var COL_NUM = 7;

var getVaildDate = function getVaildDate(date) {
  return new Date(date.replace(/-/g, '/'));
};

/* harmony default export */ var calendarvue_type_script_lang_js_ = ({
  name: 'VueCalendar',
  components: {
    CalendarHeader: header
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
      return dayjs_min_default()(new Date(this.currentDay));
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
          var date = dayjs_min_default()(getVaildDate(item[matchKey])).format(DATE_FORMATE_STRING);

          if (result[date]) {
            result[date].push(item);
          } else {
            result[date] = [item];
          }
        });
      } else {
        // object data
        Object.keys(dateData).forEach(function (key) {
          var date = dayjs_min_default()(getVaildDate(key)).format(DATE_FORMATE_STRING);
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
          monthData[row].push(_objectSpread({}, this.getItemStatus(startDate), {
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
      var tempDate = dayjs_min_default()(date);
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
        isToday: date.format('YYYY-MM-DD') === dayjs_min_default()(this.today).format('YYYY-MM-DD'),
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
});
// CONCATENATED MODULE: ./src/calendar.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_calendarvue_type_script_lang_js_ = (calendarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/calendar.vue?vue&type=style&index=0&lang=less&
var calendarvue_type_style_index_0_lang_less_ = __webpack_require__("cda2");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/calendar.vue






/* normalize component */

var component = normalizeComponent(
  src_calendarvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var calendar = (component.exports);
// CONCATENATED MODULE: ./src/index.js


/* harmony default export */ var src = ({
  install: function install(Vue) {
    Vue.component(calendar.name, calendar);
  }
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport Calendar */__webpack_require__.d(__webpack_exports__, "Calendar", function() { return calendar; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ })

/******/ });
//# sourceMappingURL=vue2-event-calendar.common.js.map