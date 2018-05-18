# Vue2 Calendar Component

Full calendar base on Vue2 and dayjs. Support month and week view. Custom date item style with scopeSlots.

[中文文档](https://github.com/kitwon/vue2-event-calendar/blob/master/README-CN.md)

[📺**Live demo**](https://kitwon.github.io/vue2-event-calendar/)

## Install

```shell
// npm
npm install vue2-event-calendar --save

// yarn
yarn add vue2-event-calendar
```

## Import and Usage

### Common usage.

```javascript
// import component
import 'vue2-event-calendar/default.css'
import Calendar from 'vue2-event-calendar'
Vue.component('Calendar', Calendar)
```

If your project also use `moment` or `dayjs`, you can use the independence version.

```javascript
import 'vue2-event-calendar/default.css'
// moment
import Calendar from 'vue2-event-calendar/dist/calendar-nodep.js'

// dayjs
import Calendar from 'vue2-event-calendar/dist/dayjs-nodep.js'

Vue.component('Calendar', Calendar)
// ...
```

```html
<!-- template -->
<Calendar startDate="2018-03-07" :dateData="data">
  <div slot="header-left">
    <Button>month</Button>
    <Button>week</Button>
  </div>

  <div
    :class="['calendar-item', { 'is-otherMonth': !isCurMonth }]"
    slot-scope="item"
  >
    <div
      :class="['calendar-item-date']">
      {{item.date.date}}
    </div>
    <div class="calendar-item-name">{{item.data.title}}</div>
  </div>
</Calendar>
```

### Customize header

```html
<!-- template -->
<Calendar
  startDate="2018-03-07"
  :renderHeader="renderHeader"
  :dateData="data">
  <!-- content -->
</Calendar>
```

```javascript
export default {
  // ...
  methods: {
    renderHeader({ prev, next, selectedDate }) {
      const h = this.$createElement

      const prevButton = h('div', {
        on: {
          click: prev
        }
      }, ['prev'])

      const nextButton = h('div', {
        on: {
          click: next
        }
      }, ['next'])

      return h('div', [prevButton, selectedDate, nextButton])
    }
  }
}
```

## Props

| parameter      | description                                                                                                                                    | type                                   | default      | acceptable value |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------ | ---------------- |
| startDate      | calendar start date                                                                                                                            | String, timestamp, Date                | new Date()   |                  |
| dateData       | calendar data, item object must have date params to match date(params key can use `matchKey` to modify)                                        | Object, Array                          |              |                  |
| matchKey       | if dateData is Array, specify which key of dateData object as calendar date match key                                                          | String                                 | date         |                  |
| locale         | set weekdays locale text, custom this text use `weekDateShort` props. If want to use custom local, use **weekLocaleData** customize you locale | String                                 | en           | zh-cn, en        |
| weekLocaleData | set body weekdays text, **begin with sunday**, if set this props, locale will be not work                                                      | array                                  |              |                  |
| firstDay       | start day of the week, 0 to 6, 0 as Sunday                                                                                                     | Number                                 | 0            | 0 - 6            |
| mode           | component view mode                                                                                                                            | String                                 | month        | month, week      |
| prefixCls      | component style namespace                                                                                                                      | String                                 | vue-calendar |                  |
| renderHeader   | redner function for header                                                                                                                     | Function({ prev, next, selectedDate }) |              |

## Event Props

| parameter     | description                            | params                                                               |
| ------------- | -------------------------------------- | -------------------------------------------------------------------- |
| onMonthChange | trigger when calendar date change      | `(date)` parameter has two key startDay and endDay of selected month |
| onPrev        | trigger after clicking the prev button | same as `onMonthChange` param                                        |
| onNext        | trigger after clicking the next button | same as `onMonthChange` param                                        |

## Methods

| name       | description                | params                                    |
| ---------- | -------------------------- | ----------------------------------------- |
| changeDate | set calendar display month | `(date)` accept `String` or `Date` Object |

## Slots

| name         | description        |
| ------------ | ------------------ |
| header-left  | header left panel  |
| header-right | header right panel |

## Scope-slots

| name | description                                                                                                                                                                                         |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | custom content for date item, the scope param is { isPrevMonth, isPrevLastDay, isNextMonth, isNextFirstDay, isToday, isCurMonth, data, date }, { data } is an Array, include all matching date data |

## TODO

1.  not depend on momentjs
2.  improve unit test coverage
3.  add animation
