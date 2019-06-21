<template>
  <div class="page-container">
    <h1>A Vue2 Full Calendar</h1>
    <h2 @click="changeDate">Has month and week two mode. And you can custom all style</h2>
    <div class="container">
      <Calendar
        class="ui-calendar"
        :dateData="dateData"
        @onMonthChange="onMonthChange"
        :mode="mode"
        :render-header="renderHeader"
        @next="onNext"
        @prev="onPrev"
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

        <!-- <template v-slot="{date: { date, data, isPrevMonth, isNextMonth, isToday }}">
          <div
            :class="[
              'ui-calendar-item',
              {
                'is-otherMonth': isPrevMonth || isNextMonth,
                'is-today': isToday
              },
            ]"
          >
            <div
              :class="['ui-calendar-item-date']">
              {{date.date}}
            </div>
            <div
              class="ui-calendar-item-name"
              v-for="(item, index) in data"
              :key="index"
            >
              <span>{{item.title}}</span>
              <span class="del" @click="deleteItem(item.title)">✖️</span>
            </div>
          </div>
        </template> -->
        <template v-slot:body="{ data }">
          <transition :name="transitionName">
            <div class="calendar-body-grid" :key="indentifier">
              <div v-for="(row, index) in data"
                :key="index"
                class="calendar-body-row">
                <div v-for="col in row"
                  class="calendar-day-item"
                  v-if="col"
                  :key="col.date.full">
                  <div
                    :class="[
                      'ui-calendar-item',
                      {
                        'is-otherMonth': col.isPrevMonth || col.isNextMonth,
                        'is-today': col.isToday
                      },
                    ]">
                    <div class="ui-calendar-item-date">
                      {{col.date.date}}
                    </div>
                    <div
                      class="ui-calendar-item-name"
                      v-for="(item, index) in col.data"
                      :key="index">
                      <span>{{item.title}}</span>
                      <span class="del" @click="deleteItem(item.title)">✖️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </template>
      </Calendar>
    </div>
  </div>
</template>

<script>
import { Calendar } from '../src/index';
import data from './data';

export default {
  name: 'App',
  components: {
    Calendar
  },
  data() {
    return {
      indentifier: '',
      dateData: data().Array,
      transitionName: 'slide-left',
      mode: 'month'
    };
  },
  methods: {
    onMonthChange(val) {
      console.log(val);
      this.indentifier = val.now.full;
    },
    onNext() {
      this.transitionName = 'slide-left';
    },
    onPrev() {
      this.transitionName = 'slide-right';
    },
    changeDate() {
      this.$refs.calendar.changeDate('2017-12-12');
    },
    deleteItem(title) {
      this.dateData = this.dateData.filter(item => item.title !== title);
    },
    renderHeader({ prev, next, selectedDate }) {
      // console.log(selectedDate)
      const h = this.$createElement;

      const prevButton = h('div', {
        class: ['ui-calendar-modeBtn'],
        on: {
          click: prev
        }
      }, ['prev']);

      const nextButton = h('div', {
        class: ['ui-calendar-modeBtn'],
        on: {
          click: next
        }
      }, ['next']);

      const dateText = h('div', { class: ['ui-calendar-modeBtn'] }, [selectedDate]);
      return h('div', [prevButton, dateText, nextButton]);
    }
  }
};
</script>

<style lang="less">
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

  // & .k-calendar {
  //   &-header-center {
  //     color: #ff7dc5;
  //   }

  //   &-week-title-item {
  //     color: #ff7dc5;
  //   }
  // }

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

  .calendar-body-row {
    height: auto;
  }

  .calendar-body {
    overflow: hidden;
  }
}

.slide-left-enter-active,
.slide-left-leave-active,
.fade-enter-active,
.fade-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all .2s ease-out;
  transform: translate3d(0, 0, 0);
}
.slide-left-enter,
.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(-50px, 0, 0);
}
.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(50px, 0, 0);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
