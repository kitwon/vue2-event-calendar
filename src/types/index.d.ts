import VueCalendar from './index.vue';
import { OpUnitType } from 'dayjs';

export interface IRenderOptions {
  prev: IMonthChange;
  next: IMonthChange;
  selectedDate: string;
}

export interface ILocaleData {
  en: string[];
  'zh-cn': string[];
  [key: string]: string[];
}

export interface IDataObject {
  [key: string]: any;
}

export interface IDateOptions {
  startDay: IDateObject;
  endDay: IDateObject;
}

export interface IDateObject {
  [key: string]: any;
}

export type IMonthChange = (date: IDateOptions) => any;
export type IRenderHeader = (control: IRenderOptions) => any;

export declare class Calendar extends VueCalendar {
  /* Namespace of component style */
  prefixCls: string

  /* Calendar start day */
  startDate?: number | string | Date

  /* Calendar data */
  dateData?: IDataObject | any[]

  /* Calendar array data match key */
  matchKey?: string

  /* Calendar header locale text */
  locale?: string

  /* Calendar header locale text array */
  weekLocaleData?: string[]

  /* Start day of week, 0 is Sunday */
  firstDay?: number

  /* Calendar display mode, accept month or week */
  mode?: OpUnitType

  /* Custom Calendar header */
  renderHeader?: IRenderHeader
}
