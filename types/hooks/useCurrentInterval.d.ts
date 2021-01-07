import './Interval.scss';
import { CalendarDayBodySlotScope } from '../types';
export declare function useCurrentInterval(): {
    calendar: any;
    nowY: import("vue").ComputedRef<string>;
    getCurrentTime: () => any;
    scrollToTime: () => void;
    renderDayBody: ({ date, week }: CalendarDayBodySlotScope) => JSX.Element;
};
export declare function CurrentInterval(props: {
    data: CalendarDayBodySlotScope;
    nowY: string;
}): JSX.Element;
