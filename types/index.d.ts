import { CreateElement, VNode } from "vue";

export interface HeaderRenderContext {
  prev: Function;
  next: Function;
  selectedDate: string;
}

export interface CalendarDataObject {
  [key: string]: string[];
}

export type CalendarLocaleType = 'en' | 'zh-cn'
export type CalendarModeType = 'month' | 'week'

export declare class Calenadr {
  /** Calendar style namespace */
  prefixCls: string

  /** Calendar start date */
  startDate: string | number | Date

  /** Calendar data */
  dateData: CalendarDataObject | any[]

  /** Calendar date key name of data object */
  matchKey: string

  /** Calendar default locale */
  locale: CalendarLocaleType

  /** Calendar start day of week */
  firstDay: number

  /** Calendar mode */
  mode: CalendarModeType

  /** Calendar week title locale data */
  weekLocaleData: string[]

  /** Render function for calendar header
   *
   * @param h The render function
   */
  renderHeader: (h: CreateElement, context: HeaderRenderContext) => VNode
}
