import { BaseProps, IntervalProps } from '../util/props';
import { VTime } from '../util/timestamp';
import { CalendarTimestamp, CalendarFormatter } from '../types';
export default function useIntervals(props: IntervalProps & BaseProps): {
    intervals: import("vue").ComputedRef<CalendarTimestamp[][]>;
    intervalFormatter: import("vue").ComputedRef<CalendarFormatter>;
    bodyHeight: import("vue").ComputedRef<number>;
    scrollRef: any;
    scrollToTime: (time: VTime) => boolean;
    getSlotScope: (timestamp: CalendarTimestamp) => any;
    showIntervalLabelDefault: (interval: CalendarTimestamp) => boolean;
    getTimestampAtEvent: (e: MouseEvent | TouchEvent, day: CalendarTimestamp) => CalendarTimestamp;
    timeToY: (time: VTime, clamp?: boolean) => number | false;
    days: import("vue").ComputedRef<CalendarTimestamp[]>;
};
