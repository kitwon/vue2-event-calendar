<template>
  <div class="page-container">
    <h1>A Vue2 Full Calendar</h1>
    <h2 @click="changeDate">Has month and week two mode. And you can custom all style</h2>
    <div class="container">
      <Calendar
        class="ui-calendar"
        :start-day="currMonth"
        :dateData="dateData"
        :on-month-change="onMonthChange"
        :mode="mode"
        :render-header="renderHeader"
        ref="calendar"
      >
        <div slot="header-left" class="ui-calendar-header__left">
          <button
            :class="['ui-calendar-modeBtn' ,{ active: mode === 'month' }]"
            @click="mode = 'month'"
          >
            Month
          </button>
          <button
            :class="['ui-calendar-modeBtn', { active: mode === 'week' }]"
            @click="mode = 'week'"
          >
            Week
          </button>
        </div>
        <div
          :class="[
            'ui-calendar-item',
            {
              'is-otherMonth': item.isPrevMonth || item.isNextMonth,
              'is-today': item.isToday
            },
          ]"
          slot-scope="item"
        >
          <div
            :class="['ui-calendar-item-date']">
            {{item.date.date}}
          </div>
          <div
            class="ui-calendar-item-name"
            v-for="(item, index) in item.data"
            :key="index"
          >
            <span>{{item.title}}</span>
            <span class="del" @click="deleteItem(item.title)">✖️</span>
          </div>
        </div>
      </Calendar>
    </div>
  </div>
</template>

<script>
// import Calendar from '../dist/calendar-nodep'
// import Calendar from '../dist/vue2-event-calendar.min'
import Calendar from '../src/dayjs'
// import Calendar from '../vue2-event-calendar'
// import '../default.css'
import data from './data'

export default {
  name: 'App',
  components: {
    Calendar
  },
  data() {
    return {
      currMonth: '',
      dateData: data.Array,
      mode: 'month'
    }
  },
  methods: {
    onMonthChange(val) {
      // console.log(val);
    },
    changeDate() {
      this.$refs.calendar.changeDate('2017-12-12')
    },
    deleteItem(title) {
      this.dateData = this.dateData.filter(item => {
        return item.title !== title
      })
    },
    renderHeader({ prev, next, selectedDate }) {
      // console.log(selectedDate)
      const h = this.$createElement;

      const prevButton = h('div', {
        class: ['ui-calendar-modeBtn'],
        on: {
          click: prev
        }
      }, ['prev'])

      const nextButton = h('div', {
        class: ['ui-calendar-modeBtn'],
        on: {
          click: next
        }
      }, ['next'])

      const dateText = h('div', { class: ['ui-calendar-modeBtn'] }, [selectedDate])
      return h('div', [prevButton, dateText, nextButton])
    }
  }
}
</script>

<style lang="less">
@import "../src/style/calendar.less";

* {
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  margin: 0;
  padding: 0;
}

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
  font-size: 2.4rem;
}

.page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 40px;
}

.container {
  width: 80%;
  margin: 0 auto;
  flex: 1;
  height: 100%;
}

.ui-calendar {
  margin-top: 20px;
  box-shadow: 0 1px 5px darken(#fb7bb0, 20%);
  border-radius: 5px;
  height: 90%;

  &-header {
    &__left {

      > button {
        font-size: 12px;

        &:nth-child(2) {
          margin-left: -4px;
        }
      }
    }
  }

  &-modeBtn {
    position: relative;
    display: inline-block;
    background: #fff;
    border: 1px solid #ff7dc5;
    color: #ff7dc5;
    padding: 5px 1em;
    font-size: 13px;
    line-height: 1;
    box-shadow: 0 1px 3px lighten(#ff7dc5, 15%);
    min-width: 5em;
    margin-right: -1px;
    // text-indent: 0.5em;
    text-align: center;
    cursor: pointer;

    &:first-child {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }

    &:last-child {
      // left: -.5em;
      border-bottom-right-radius: 3px;
      border-top-right-radius: 3px;
    }

    &:active,
    &:focus {
      outline: none;
    }

    &.active,
    &:active {
      background: #ff7dc5;
      color: #fff;
      z-index: 2;
    }
  }

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

    &.is {
      &-otherMonth {
        color: #bbb;
      }

      &-today {
        .ui-calendar-item-date {
          position: relative;
          display: inline-block;
          background: #ff7dc5;
          color: #fff;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          text-align: center;
          line-height: 20px;
          top: -1px;
        }
      }
    }

    &-name {
      font-size: 12px;
      > * {
        vertical-align: middle;
      }

      .del {
        display: inline-block;
        cursor: pointer;
        color: inherit;
        margin-bottom: -2px;
      }
    }
  }

  .vue-calendar-body-row {
    height: auto;
  }
}
</style>

