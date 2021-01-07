import './Daily.scss';
import { CalendarTimestamp } from './types';
declare const _default: import("vue").DefineComponent<{
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
        validate: typeof import(".").validateTime;
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
    type: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: import("vue").PropType<string | number | Date>;
        validate: typeof import(".").validateTimestamp;
    };
    now: {
        type: StringConstructor;
        validate: typeof import(".").validateTimestamp;
    };
    locale: {
        type: StringConstructor;
        default: string;
    };
    start: {
        type: (DateConstructor | StringConstructor | NumberConstructor)[];
        validate: typeof import(".").validateTimestamp;
        default: () => string;
    };
    end: {
        type: (DateConstructor | StringConstructor | NumberConstructor)[];
        validate: typeof import(".").validateTimestamp;
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
    Head: () => JSX.Element;
    Body: () => JSX.Element;
    scrollToTime: (time: import(".").VTime) => boolean;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    start: string | number;
    weekdays: string | number[];
    hideHeader: boolean;
    shortWeekdays: boolean;
    weekdayFormat: import("./types").CalendarFormatter;
    dayFormat: import("./types").CalendarFormatter;
    type: string;
    locale: string;
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
}>;
export default _default;
