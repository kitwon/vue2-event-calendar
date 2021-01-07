import { ExtractPropTypes, PropType } from 'vue';
import { validateTimestamp, validateTime } from './timestamp';
import { CalendarEvent, CalendarFormatter, CalendarTimestamp, CalendarEventOverlapMode, CalendarEventNameFunction, CalendarEventColorFunction, CalendarEventCategoryFunction, CalendarEventTimedFunction } from '../types';
export declare function validateNumber(input: any): boolean;
export declare function validateWeekdays(input: string | (number | string)[]): boolean;
declare const props: {
    base: {
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
            type: PropType<string | number[]>;
            default: () => number[];
            validate: typeof validateWeekdays;
        };
        hideHeader: {
            type: BooleanConstructor;
        };
        shortWeekdays: {
            type: BooleanConstructor;
            default: boolean;
        };
        weekdayFormat: {
            type: PropType<CalendarFormatter>;
            default: null;
        };
        dayFormat: {
            type: PropType<CalendarFormatter>;
            default: null;
        };
    };
    intervals: {
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
            validate: typeof validateNumber;
        };
        intervalWidth: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
            validate: typeof validateNumber;
        };
        intervalMinutes: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
            validate: typeof validateNumber;
        };
        firstInterval: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
            validate: typeof validateNumber;
        };
        firstTime: {
            type: (StringConstructor | NumberConstructor | ObjectConstructor)[];
            validate: typeof validateTime;
        };
        intervalCount: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
            validate: typeof validateNumber;
        };
        intervalFormat: {
            type: PropType<CalendarFormatter>;
            default: null;
        };
        intervalStyle: {
            type: PropType<(interval: CalendarTimestamp) => object>;
            default: null;
        };
        showIntervalLabel: {
            type: PropType<(interval: CalendarTimestamp) => boolean>;
            default: null;
        };
    };
    weeks: {
        localeFirstDayOfYear: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        minWeeks: {
            validate: typeof validateNumber;
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
            type: PropType<CalendarFormatter>;
            default: null;
        };
    };
    calendar: {
        /**
         * Calendar type
         */
        type: {
            type: StringConstructor;
            default: string;
        };
        modelValue: {
            type: PropType<string | number | Date>;
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
    };
    category: {
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
    };
    events: {
        events: {
            type: PropType<CalendarEvent[]>;
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
            type: PropType<string | CalendarEventTimedFunction>;
            default: string;
        };
        eventCategory: {
            type: PropType<string | CalendarEventCategoryFunction>;
            default: string;
        };
        eventHeight: {
            type: NumberConstructor;
            default: number;
        };
        eventColor: {
            type: PropType<string | CalendarEventColorFunction>;
            default: string;
        };
        eventTextColor: {
            type: PropType<string | CalendarEventColorFunction>;
            default: string;
        };
        eventName: {
            type: PropType<string | CalendarEventNameFunction>;
            default: string;
        };
        eventOverlapThreshold: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        eventOverlapMode: {
            type: PropType<CalendarEventOverlapMode | "stack" | "column">;
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
    };
};
export default props;
export declare type EventProps = ExtractPropTypes<typeof props.events>;
export declare type BaseProps = ExtractPropTypes<typeof props.base & typeof props.calendar>;
export declare type IntervalProps = ExtractPropTypes<typeof props.intervals>;
export declare type CategoryProps = ExtractPropTypes<typeof props.category>;
export declare type CalendarProps = EventProps & BaseProps & IntervalProps & CategoryProps;
