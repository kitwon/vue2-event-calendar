import { CalendarFormatter, CalendarTimestamp } from '../types';
import { BaseProps } from '../util/props';
export default function useBase(props: BaseProps): {
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
    parsedWeekdays: import("vue").ComputedRef<number[]>;
    weekdaySkips: import("vue").ComputedRef<number[]>;
    weekdaySkipsReverse: import("vue").ComputedRef<number[]>;
    parsedStart: import("vue").ComputedRef<CalendarTimestamp>;
    parsedEnd: import("vue").ComputedRef<CalendarTimestamp>;
    days: import("vue").ComputedRef<CalendarTimestamp[]>;
    dayFormatter: import("vue").ComputedRef<CalendarFormatter>;
    weekdayFormatter: import("vue").ComputedRef<CalendarFormatter>;
    updateTimes: () => void;
    getFormatter: (options: object) => CalendarFormatter;
    getRelativeClasses: (timestamp: CalendarTimestamp, outside?: boolean) => {
        'v-present': boolean;
        'v-past': boolean;
        'v-future': boolean;
        'v-outside': boolean;
    };
    getStartOfWeek: (timestamp: CalendarTimestamp) => CalendarTimestamp;
    getEndOfWeek: (timestamp: CalendarTimestamp) => CalendarTimestamp;
};
