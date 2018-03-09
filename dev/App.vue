<template>
  <div>
    <h1>A Vue2 Full Calendar</h1>
    <h2>Has month and week two mode. And you can custom all style</h2>
    <Calendar
      :dateData="dateData"
      class="ui-calendar"
      v-model="currMonth"
      locale="zh-cn"
    >
      <div
        :class="['ui-calendar-item', {'is-otherMonth': item.isPrevMonth || item.isNextMonth}]"
        slot-scope="item">
        <div
          :class="['ui-calendar-item-date']">
          {{item.date.date}}
        </div>
        <div class="ui-calendar-item-name">{{item.data.title}}</div>
      </div>
    </Calendar>
  </div>
</template>

<script>
import Calendar from '../vue2-event-calendar'
// import Calendar from '../src/calendar'
import '../default.css'
import data from './data'

export default {
  name: 'App',
  components: {
    Calendar
  },
  data() {
    return {
      currMonth: new Date(),
      dateData: data
    }
  }
}
</script>

<style lang="less">
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue',
    Helvetica, Arial, sans-serif;
  color: #333;
  background-image: linear-gradient(60deg, #fb7bb0, #fb7bce);
}
h1,
h2 {
  color: #fff;
  text-align: center;
  text-shadow: 0 3px 1px darken(#fb7bb0, 20%);
  margin: 0;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
h1 {
  margin-top: 40px;
  font-size: 2.4rem;
}

.ui-calendar {
  margin-top: 20px;
  box-shadow: 0 1px 5px darken(#fb7bb0, 20%);
  border-radius: 5px;

  & .k-calendar {
    &-header-center {
      color: #ff7dc5;
    }

    &-week-title-item {
      color: #ff7dc5;
    }
  }

  &-item {
    padding: 5px 10px;
    color: #666;

    &.is-otherMonth {
      color: #bbb;
    }

    &-name {
      font-size: 12px;
    }
  }
}
</style>

