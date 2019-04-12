<template>
  <div :class="[`${prefixCls}`, `is-${mode}`]">
    <calendar-header
      :mode="mode"
      :prefix-cls="prefixCls"
      :render-header="renderHeader"
      :header-left="$slots['header-left']"
      :header-right="$slots['header-right']"
      :current-date="formatedDay"
      @prev="prev"
      @next="next" />

    <div :class="`${prefixCls}-week`">
      <div v-for="item in titleArray"
        :key="item"
        :class="`${prefixCls}-week__item`">
        {{ item }}
      </div>
    </div>

    <div :class="`${prefixCls}-body`">
      <div v-for="(row, index) in (monthData.length / titleArray.length)"
        :key="index"
        :class="`${prefixCls}-body-row`">
        <template v-for="i in 7">
          <div :class="`${prefixCls}-day-item`"
            v-if="monthData[(i - 1) + index * 7]"
            :key="i">
            <slot :date="monthData[(i - 1) + index * 7]" />
          </div>
        </template>
       </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import dayjs, { OpUnitType } from 'dayjs';
import { getMonthViewStartDay} from './date-func';
import { CreateElement } from 'vue';
import CalendarHeader from './header.vue';
import { IDataObject, IRenderHeader, ILocaleData } from './types/index';

@Component({
  name: 'Calendar',
  components: {
    CalendarHeader
  }
})
export default class Calendar extends Vue {
  @Prop({ default: 'calendar' }) prefixCls!: string;
  @Prop([Number, String, Date]) startDate!: number | string | Date;
  @Prop({ default: () => [] }) dateData!: IDataObject | any[];
  @Prop({ default: 'date' }) matchKey!: string;
  @Prop({ default: 'en' }) locale!: string;
  @Prop({ default: 0 }) firstDay!: number;
  @Prop({
    default: 'month',
    validator: (val: any) => val === 'month' || val === 'week'
  }) mode!: OpUnitType;
  @Prop(Array) weekDateShort!: string[];
  // @Prop({ default: () => undefined }) onMonthChange!: IMonthChange;
  // @Prop({ default: () => undefined }) onPrev!: IMonthChange;
  // @Prop({ default: () => undefined }) onNext!: IMonthChange;
  @Prop(Function) renderHeader!: IRenderHeader;
  @Prop(Array) weekLocaleData!: string[];


  // init data
  currentDay: any = '';
  today: string = this.currentDay;
  localeData: ILocaleData = {
    'zh-cn': '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    'en': 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_')
  };

  // computed
  get formatedDay() {
    return dayjs(new Date(this.currentDay));
  }

  get titleArray() {
    const arr = this.weekDateShort || this.weekLocaleData || this.localeData[this.locale];
    let i = this.firstDay - 1;

    return arr.map(() => {
      if (++i >= 7) { i = 0; }

      return arr[i];
    });
  }

  get monthData() {
    const {
      dateData,
      formatedDay,
      firstDay,
      mode,
      matchKey,
    } = this;

    if (!formatedDay) { return []; }

    let monthViewStartDate = getMonthViewStartDay(
      formatedDay,
      firstDay,
      mode,
    );
    const monthData = [];
    let row = 6;

    if (this.mode === 'week') { row = 1; }

    for (let day = 0; day < 7 * row; day++) {
      let data: any[] = [];

      if (dateData instanceof Array) {
        data = dateData.filter((item: any) => {
          const date = item[matchKey].replace('-', '/');
          return monthViewStartDate.isSame(
            dayjs(new Date(date)),
          );
        });
      } else {
        Object.keys(dateData).forEach((key: string) => {
          const date = key.replace('-', '/');
          if (monthViewStartDate.isSame(dayjs(new Date(date)))) {
            data.push(dateData[key]);
          }
        });
      }

      monthData.push({
        ...this.getItemStatus(monthViewStartDate),
        data: data || {},
        date: {
          year: monthViewStartDate.year(),
          month: monthViewStartDate.month() + 1,
          date: monthViewStartDate.date(),
          day: monthViewStartDate.day(),
          full: monthViewStartDate.format('YYYY-MM-DD'),
        },
      });

      monthViewStartDate = monthViewStartDate.add(1, 'day');
    }

    return monthData;
  }

  // methods
  getItemStatus(date: any) {
    const tempDate = dayjs(date);
    const {
      formatedDay,
    } = this;

    const isCurMonth = tempDate.month() === formatedDay.month();

    const isPrevMonth = !isCurMonth && tempDate.isBefore(this.formatedDay, 'month');
    const isNextMonth = !isCurMonth && tempDate.isAfter(this.formatedDay, 'month');

    const isPrevLastDay = isPrevMonth ? tempDate.isSame(tempDate.endOf('month')) : false;
    const isNextFirstDay = isNextMonth ? tempDate.isSame(tempDate.startOf('month')) : false;

    return {
      isPrevMonth,
      isPrevLastDay,
      isNextMonth,
      isNextFirstDay,
      // isToday: date.isSame(dayjs(this.today), 'day'),
      isToday: date.format('YYYY-MM-DD') === dayjs(this.today).format('YYYY-MM-DD'),
      isCurMonth,
    };
  }

  @Emit()
  onMonthChange() {
    return {
      startDay: this.monthData[0].date,
      endDay: this.monthData[this.monthData.length - 1].date,
    };
  }

  changeDate(date: Date) {
    if (typeof date !== 'string' && Object.prototype.toString.call(date) !== '[object Date]') {
      /* tslint:disable: no-console */
      console.error('invalied date!');
      return false;
    }

    this.currentDay = date;
  }

  @Emit()
  prev() {
    const {
      formatedDay,
      mode,
      monthData,
    } = this;

    this.currentDay = formatedDay
      .subtract(1, mode)
      .startOf(mode)
      .format('YYYY-MM-DD');

    return {
      startDay: monthData[0].date,
      endDay: monthData[monthData.length - 1].date,
    };
  }

  @Emit()
  next() {
    const {
      formatedDay,
      mode,
      monthData,
    } = this;

    this.currentDay = formatedDay
      .add(1, mode)
      .startOf(mode)
      .format('YYYY-MM-DD');

    return {
      startDay: monthData[0].date,
      endDay: monthData[monthData.length - 1].date,
    };
  }

  // watch
  @Watch('startDate', { immediate: true })
  private onStartDateChange(val: string) {
    this.currentDay = val ? new Date(val) : new Date();

    if (!this.today) {
      this.today = this.currentDay;
    }
  }

  @Watch('currentDay', { immediate: true })
  private onCurrentDatyChange() {
    this.onMonthChange();
  }

  @Watch('mode')
  private onModeChange() {
    this.onMonthChange();
  }
}
</script>

<style lang="less">
@import "./style/calendar";
</style>
