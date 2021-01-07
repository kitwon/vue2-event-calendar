import { VNode } from 'vue';
export interface CalendarTimestamp {
    date: string;
    time: string;
    year: number;
    month: number;
    day: number;
    weekday: number;
    hour: number;
    minute: number;
    hasDay: boolean;
    hasTime: boolean;
    past: boolean;
    present: boolean;
    future: boolean;
}
export declare type CalendarFormatter = (timestamp: CalendarTimestamp, short: boolean) => string;
export interface CalendarEvent {
    [prop: string]: any;
}
export interface CalendarEventParsed {
    input: CalendarEvent;
    start: CalendarTimestamp;
    startIdentifier: number;
    startTimestampIdentifier: number;
    end: CalendarTimestamp;
    endIdentifier: number;
    endTimestampIdentifier: number;
    allDay: boolean;
    index: number;
    category: string | false;
}
export interface CalendarEventScope<T = CalendarEvent> {
    event: T;
    outside: boolean;
    timed: boolean;
    eventSummary: () => VNode;
}
export interface CalendarDaySlotScope extends CalendarTimestamp {
    outside: boolean;
    index: number;
    week: CalendarTimestamp[];
    category: string | undefined | null;
}
export interface CalendarEventVisual {
    event: CalendarEventParsed;
    columnCount: number;
    column: number;
    left: number;
    width: number;
}
export declare type CalendarTimeToY = (time: CalendarTimestamp | number | string, clamp?: boolean) => number;
export declare type CalendarTimeDelta = (time: CalendarTimestamp | number | string) => number | false;
export interface CalendarDayBodySlotScope extends CalendarDaySlotScope {
    timeToY: CalendarTimeToY;
    timeDelta: CalendarTimeDelta;
}
export declare type CalendarEventOverlapMode = (events: CalendarEventParsed[], firstWeekday: number, overlapThreshold: number) => (day: CalendarDaySlotScope, dayEvents: CalendarEventParsed[], timed: boolean, reset: boolean) => CalendarEventVisual[];
export declare type CalendarEventColorFunction = (event: CalendarEvent) => string;
export declare type CalendarEventTimedFunction = (event: CalendarEvent) => boolean;
export declare type CalendarEventCategoryFunction = (event: CalendarEvent) => string;
export declare type CalendarEventNameFunction = (event: CalendarEventParsed, timedEvent: boolean) => string;
export declare enum SlotNames {
    day = "day",
    body = "day-body",
    header = "day-header",
    event = "event"
}
