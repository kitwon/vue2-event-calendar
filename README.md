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

### Import

```javascript
// import component
import 'vue2-event-calendar/dist/vue2-event-calendar.css'
import Calendar from 'vue2-event-calendar'
Vue.component('Calendar', Calendar)
```

Or import as a component

```javascript
import 'vue2-event-calendar/dist/vue2-event-calendar.css'
import { Calendar } from 'vue2-event-calendar'
// ...

export default {
  components: { Calendar }
}
```

### Common usage

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

> Get full control use body slot. Data structure is a matrix and the size is **6*7**.

```html
<Calendar startDate="2018-03-07" :dateData="data">
  <div slot="header-left">
    <Button>month</Button>
    <Button>week</Button>
  </div>

  <template v-slot:body="{ data }">
    <transition name="fade">
      <div class="calendar-body-grid" :key="indentifier">
        <div v-for="(row, index) in data"
          :key="index"
          class="calendar-body-row">
          <div v-for="col in row"
            :key="col.date.date"
            :class="['calendar-item', { 'is-otherMonth': !col.isCurMonth }]">
            <div
              :class="['calendar-item-date']">
              {{col.date.date}}
            </div>
            <div class="calendar-item-name">{{col.data.title}}</div>
          </div>
        </div>
      </div>
    </transition>
  </template>
</Calendar>
```

### Customize header use renderHeader props

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

| name    | description                                                                                                                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default | custom content for date item, the scope param is { isPrevMonth, isPrevLastDay, isNextMonth, isNextFirstDay, isToday, isCurMonth, data, date }, { data } is an Array, include all matching date data |
| body    | return all date item in scope param, data structure is a 6*7 matrix, and the date item is same as default scope slot                                                                                |
