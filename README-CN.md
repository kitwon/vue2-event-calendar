# Vue2 Calendar Component

Vue2 事件日历，有月和周两种模式，使用 scopeSlots 自定义日历展示。

[📺**Live demo**](https://kitwon.github.io/vue2-event-calendar/)

## 安装

```shell
// npm
npm install vue2-event-calendar --save

// yarn
yarn add vue2-event-calendar
```

## 使用

### Common usage.

```javascript
// import component
import 'vue2-event-calendar/default.css'
import Calendar from 'vue2-event-calendar'
Vue.component('Calendar', Calendar)
```

如果你的项目也使用了`moment` 或者 `dayjs`，可以使用无依赖版本。

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
  </div
</Calendar>
```

### 自定义头部

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

| parameter     | description                                                                                | type                                   | default      | acceptable value |
| ------------- | ------------------------------------------------------------------------------------------ | -------------------------------------- | ------------ | ---------------- |
| startDate     | 日历开始日期                                                                               | String, timestamp, Date                | new Date()   |                  |
| dateData      | 日历展示数据，数据对象中必须有 date 参数，或者你可以使用`matchKey`自定义匹配日期参数的名字 | Object, Array                          |              |                  |
| matchKey      | 如果数据是一个数组，设置数组对象匹配日期的参数名                                           | String                                 | date         |                  |
| locale        | 设置日历顶部周标题显示语言                                                                 | String                                 | en           | zh-cn, en        |
| weekLocaleData | 自定义周标题显示内容，如果使用这个 props，local 将不起作用                                 | array                                  |              |                  |
| firstDay      | 设置每周第一天，默认周日，0 为周日                                                         | Number                                 | 0            | 0 - 6            |
| mode          | 组件显示模式，默认为月日历                                                                 | String                                 | month        | month, week      |
| prefixCls     | 组件样式命名空间                                                                           | String                                 | vue-calendar |                  |
| renderHeader  | 头部渲染函数                                                                               | Function({ prev, next, selectedDate }) |              |                  |

## Event Props

| parameter     | description          | params                                               |
| ------------- | -------------------- | ---------------------------------------------------- |
| onMonthChange | 日历日期改变触发     | `(date)` 参数返回当前选择月或周的 startDay 和 endDay |
| onPrev        | 选择上个日期时候触发 | 和`onMonthChange`返回一样                            |
| onNext        | 选择下个日期时候触发 | 和`onMonthChange`返回一样                            |

## Methods

| name       | description        | params                                    |
| ---------- | ------------------ | ----------------------------------------- |
| changeDate | 设置日历跳转的日期 | `(date)` 参数接收日期字符串或者`Date`对象 |

## Slots

| name         | description       |
| ------------ | ----------------- |
| header-left  | 日历顶部左边 slot |
| header-right | 日历顶部右边 slot |

## Scope-slots

| name | description                                                                                                                                                          |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | scopslot 返回对象的参数{ isPrevMonth, isPrevLastDay, isNextMonth, isNextFirstDay, isToday, isCurMonth, data, date }, { data } 是一个数组，里面包含匹配日期的所有数据 |

## TODO

1.  不依赖momentjs
2.  提高单元测试覆盖率
3.  添加动画
