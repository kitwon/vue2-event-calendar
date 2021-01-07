import './Weekly.scss';
declare const _default: import("vue").DefineComponent<{
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
        validate: typeof import("./util/timestamp").validateTimestamp;
    };
    now: {
        type: StringConstructor;
        validate: typeof import("./util/timestamp").validateTimestamp;
    };
    locale: {
        type: StringConstructor;
        default: string;
    };
    start: {
        type: (DateConstructor | StringConstructor | NumberConstructor)[];
        validate: typeof import("./util/timestamp").validateTimestamp;
        default: () => string;
    };
    end: {
        type: (DateConstructor | StringConstructor | NumberConstructor)[];
        validate: typeof import("./util/timestamp").validateTimestamp;
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
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    start: string | number;
    weekdays: string | number[];
    hideHeader: boolean;
    shortWeekdays: boolean;
    weekdayFormat: import("./types").CalendarFormatter;
    dayFormat: import("./types").CalendarFormatter;
    type: string;
    locale: string;
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
}>, {
    start: string | number;
    weekdays: string | number[];
    hideHeader: boolean;
    shortWeekdays: boolean;
    weekdayFormat: import("./types").CalendarFormatter;
    dayFormat: import("./types").CalendarFormatter;
    type: string;
    locale: string;
    localeFirstDayOfYear: string | number;
    minWeeks: number;
    shortMonths: boolean;
    showMonthOnFirst: boolean;
    showWeek: boolean;
    monthFormat: import("./types").CalendarFormatter;
}>;
export default _default;
