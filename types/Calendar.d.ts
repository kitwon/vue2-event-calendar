import './Event.scss';
import { CalendarTimestamp } from './types';
import { validateTimestamp, VTime } from './util/timestamp';
declare const Calendar: import("vue").DefineComponent<{
    events: {
        type: import("vue").PropType<import("./types").CalendarEvent[]>;
        default: () => never[];
    };
    eventStart: {
        type: StringConstructor;
        default: string;
    };
    eventEnd: {
        type: StringConstructor;
        default: string;
    };
    eventTimed: {
        type: import("vue").PropType<string | import("./types").CalendarEventTimedFunction>;
        default: string;
    };
    eventCategory: {
        type: import("vue").PropType<string | import("./types").CalendarEventCategoryFunction>;
        default: string;
    };
    eventHeight: {
        type: NumberConstructor;
        default: number;
    };
    eventColor: {
        type: import("vue").PropType<string | import("./types").CalendarEventColorFunction>;
        default: string;
    };
    eventTextColor: {
        type: import("vue").PropType<string | import("./types").CalendarEventColorFunction>;
        default: string;
    };
    eventName: {
        type: import("vue").PropType<string | import("./types").CalendarEventNameFunction>;
        default: string;
    };
    eventOverlapThreshold: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    eventOverlapMode: {
        type: import("vue").PropType<import("./types").CalendarEventOverlapMode | "stack" | "column">;
        default: string;
        validate: (mode: any) => boolean;
    };
    eventMore: {
        type: BooleanConstructor;
        default: boolean;
    };
    eventMoreText: {
        type: StringConstructor;
        default: string;
    };
    eventRipple: {
        type: (BooleanConstructor | ObjectConstructor)[];
        default: null;
    };
    eventMarginBottom: {
        type: NumberConstructor;
        default: number;
    };
    categories: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    categoryHideDynamic: {
        type: BooleanConstructor;
    };
    categoryShowAll: {
        type: BooleanConstructor;
    };
    categoryForInvalid: {
        type: StringConstructor;
        default: string;
    };
    categoryDays: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
        validate: (x: any) => boolean;
    };
    maxDays: {
        type: NumberConstructor;
        default: number;
    };
    shortIntervals: {
        type: BooleanConstructor;
        default: boolean;
    };
    intervalHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
        validate: typeof import("./util/props").validateNumber;
    };
    intervalWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
        validate: typeof import("./util/props").validateNumber;
    };
    intervalMinutes: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
        validate: typeof import("./util/props").validateNumber;
    };
    firstInterval: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
        validate: typeof import("./util/props").validateNumber;
    };
    firstTime: {
        type: (StringConstructor | NumberConstructor | ObjectConstructor)[];
        validate: typeof import("./util/timestamp").validateTime;
    };
    intervalCount: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
        validate: typeof import("./util/props").validateNumber;
    };
    intervalFormat: {
        type: import("vue").PropType<import("./types").CalendarFormatter>;
        default: null;
    };
    intervalStyle: {
        type: import("vue").PropType<(interval: CalendarTimestamp) => object>;
        default: null;
    };
    showIntervalLabel: {
        type: import("vue").PropType<(interval: CalendarTimestamp) => boolean>;
        default: null;
    };
    localeFirstDayOfYear: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    minWeeks: {
        validate: typeof import("./util/props").validateNumber;
        default: number;
    };
    shortMonths: {
        type: BooleanConstructor;
        default: boolean;
    };
    showMonthOnFirst: {
        type: BooleanConstructor;
        default: boolean;
    };
    showWeek: BooleanConstructor;
    monthFormat: {
        type: import("vue").PropType<import("./types").CalendarFormatter>;
        default: null;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: import("vue").PropType<string | number | Date>;
        validate: typeof validateTimestamp;
    };
    now: {
        type: StringConstructor;
        validate: typeof validateTimestamp;
    };
    locale: {
        type: StringConstructor;
        default: string;
    };
    start: {
        type: (DateConstructor | StringConstructor | NumberConstructor)[];
        validate: typeof validateTimestamp;
        default: () => string;
    };
    end: {
        type: (DateConstructor | StringConstructor | NumberConstructor)[];
        validate: typeof validateTimestamp;
    };
    weekdays: {
        type: import("vue").PropType<string | number[]>;
        default: () => number[];
        validate: typeof import("./util/props").validateWeekdays;
    };
    hideHeader: {
        type: BooleanConstructor;
    };
    shortWeekdays: {
        type: BooleanConstructor;
        default: boolean;
    };
    weekdayFormat: {
        type: import("vue").PropType<import("./types").CalendarFormatter>;
        default: null;
    };
    dayFormat: {
        type: import("vue").PropType<import("./types").CalendarFormatter>;
        default: null;
    };
}, {
    renderProps: import("vue").ComputedRef<{
        component: any;
        classes: string;
        props: {
            start: CalendarTimestamp;
            end: CalendarTimestamp;
            maxDays: number;
            weekdays: number[];
        };
    }>;
    parsedValue: import("vue").ComputedRef<CalendarTimestamp>;
    noEvents: import("vue").ComputedRef<boolean>;
    move: (amount?: number) => void;
    next: (amount?: number) => void;
    prev: (amount?: number) => void;
    getScopeSlots: () => {
        day?: import("./hooks/useEvents").DayBodyScope | import("./hooks/useEvents").DayScope | undefined;
        "day-body"?: import("./hooks/useEvents").DayBodyScope | import("./hooks/useEvents").DayScope | undefined;
        "day-header"?: import("./hooks/useEvents").DayBodyScope | import("./hooks/useEvents").DayScope | undefined;
        event?: import("./hooks/useEvents").DayBodyScope | import("./hooks/useEvents").DayScope | undefined;
    };
    timeToY: (time: VTime, clamp?: boolean) => number | false;
    scrollToTime: (time: VTime) => any;
    calendarRef: any;
    updateTimes: () => void;
    checkChange: () => void;
    times: {
        now: {
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
        };
        today: {
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
        };
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    start: string | number;
    weekdays: string | number[];
    hideHeader: boolean;
    shortWeekdays: boolean;
    weekdayFormat: import("./types").CalendarFormatter;
    dayFormat: import("./types").CalendarFormatter;
    type: string;
    locale: string;
    events: import("./types").CalendarEvent[];
    eventStart: string;
    eventEnd: string;
    eventTimed: string | import("./types").CalendarEventTimedFunction;
    eventCategory: string | import("./types").CalendarEventCategoryFunction;
    eventHeight: number;
    eventColor: string | import("./types").CalendarEventColorFunction;
    eventTextColor: string | import("./types").CalendarEventColorFunction;
    eventName: string | import("./types").CalendarEventNameFunction;
    eventOverlapThreshold: string | number;
    eventOverlapMode: import("./types").CalendarEventOverlapMode | "stack" | "column";
    eventMore: boolean;
    eventMoreText: string;
    eventRipple: null;
    eventMarginBottom: number;
    categories: string | unknown[];
    categoryHideDynamic: boolean;
    categoryShowAll: boolean;
    categoryForInvalid: string;
    categoryDays: string | number;
    maxDays: number;
    shortIntervals: boolean;
    intervalHeight: string | number;
    intervalWidth: string | number;
    intervalMinutes: string | number;
    firstInterval: string | number;
    intervalCount: string | number;
    intervalFormat: import("./types").CalendarFormatter;
    intervalStyle: (interval: CalendarTimestamp) => object;
    showIntervalLabel: (interval: CalendarTimestamp) => boolean;
    localeFirstDayOfYear: string | number;
    minWeeks: number;
    shortMonths: boolean;
    showMonthOnFirst: boolean;
    showWeek: boolean;
    monthFormat: import("./types").CalendarFormatter;
} & {
    end?: string | number | undefined;
    now?: string | undefined;
    modelValue?: string | number | Date | undefined;
    firstTime?: unknown;
}>, {
    start: string | number;
    weekdays: string | number[];
    hideHeader: boolean;
    shortWeekdays: boolean;
    weekdayFormat: import("./types").CalendarFormatter;
    dayFormat: import("./types").CalendarFormatter;
    type: string;
    locale: string;
    events: import("./types").CalendarEvent[];
    eventStart: string;
    eventEnd: string;
    eventTimed: string | import("./types").CalendarEventTimedFunction;
    eventCategory: string | import("./types").CalendarEventCategoryFunction;
    eventHeight: number;
    eventColor: string | import("./types").CalendarEventColorFunction;
    eventTextColor: string | import("./types").CalendarEventColorFunction;
    eventName: string | import("./types").CalendarEventNameFunction;
    eventOverlapThreshold: string | number;
    eventOverlapMode: import("./types").CalendarEventOverlapMode | "stack" | "column";
    eventMore: boolean;
    eventMoreText: string;
    eventRipple: null;
    eventMarginBottom: number;
    categories: string | unknown[];
    categoryHideDynamic: boolean;
    categoryShowAll: boolean;
    categoryForInvalid: string;
    categoryDays: string | number;
    maxDays: number;
    shortIntervals: boolean;
    intervalHeight: string | number;
    intervalWidth: string | number;
    intervalMinutes: string | number;
    firstInterval: string | number;
    intervalCount: string | number;
    intervalFormat: import("./types").CalendarFormatter;
    intervalStyle: (interval: CalendarTimestamp) => object;
    showIntervalLabel: (interval: CalendarTimestamp) => boolean;
    localeFirstDayOfYear: string | number;
    minWeeks: number;
    shortMonths: boolean;
    showMonthOnFirst: boolean;
    showWeek: boolean;
    monthFormat: import("./types").CalendarFormatter;
}>;
export default Calendar;
