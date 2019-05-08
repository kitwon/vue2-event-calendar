import Vue from 'vue';

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

export class Calendar extends Vue {}
