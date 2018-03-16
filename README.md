# Vue2 Calendar Component

Full calendar base on Vue2 and momentjs. Support month and week view. Custom date item style with scopeSlots.

## Install

```shell
// npm
npm install vue2-event-calendar --save

// yarn
yarn add vue2-event-calendar
```

## Import and Usage

Common usage.

```javascript
// import component
import Calendar from 'vue2-event-calendar'
Vue.component('Calendar', Calendar)
```

If your project also use `moment.js`, you can use the independence version.

```javascript
import Calendar from 'vue2-event-calendar/dist/calendar-nodep.js'
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
  </div
</Calendar>
```

## Props

| parameter | description                                                                                                       | type                    | default      | acceptable value |
| --------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------ | ---------------- |
| startDate | calendar start date                                                                                               | String, timestamp, Date | new Date()   |                  |
| dateData  | calendar data, item object must have date params to match date(params key can use `matchKey` to modify)           | Array                   |              |                  |
| matchKey  | specify which key of dateData object as calendar date match key                                                   | String                  | date         |                  |
| locale    | locale data of calendar language, other locale name please check [momentjs](http://momentjs.com/docs/#/i18n/) doc | String                  | en           |                  |
| firstDay  | start day of the week, 0 to 6, 0 as Sunday                                                                        | Number                  | 0            | 0 - 6            |
| mode      | component view mode                                                                                               | String                  | month        | month, week      |
| prefixCls | component style namespace                                                                                         | String                  | vue-calendar |                  |

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

| name | description                                                                                                                                   |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------- |
|      | custom content for date item, the scope param is { isPrevMonth, isPrevLastDay, isNextMonth, isNextFirstDay, isToday, isCurMonth, data, date } |

## TODO

1. custom header
2. improve unit test coverage
