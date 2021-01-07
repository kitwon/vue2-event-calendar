import { SetupContext, VNode } from 'vue';
import { BaseProps, CategoryProps, EventProps } from '../util/props';
import { CalendarEventParsed, CalendarEventVisual, CalendarDaySlotScope, CalendarDayBodySlotScope, SlotNames } from '../types';
export declare type VEventGetter<D> = (day: D) => CalendarEventParsed[];
export declare type VEventVisualToNode<D> = (visual: CalendarEventVisual, day: D) => VNode | false;
export declare type VEventsToNodes = <D extends CalendarDaySlotScope>(day: D, getter: VEventGetter<D>, mapper: VEventVisualToNode<D>, timed: boolean) => VNode[] | undefined;
export declare type VDailyEventsMap = {
    [date: string]: {
        parent: HTMLElement;
        more: HTMLElement | null;
        events: HTMLElement[];
    };
};
export interface VEventScopeInput {
    eventParsed: CalendarEventParsed;
    day: CalendarDaySlotScope;
    start: boolean;
    end: boolean;
    timed: boolean;
}
export declare type DayScope = (day: CalendarDaySlotScope) => VNode[] | undefined;
export declare type DayBodyScope = (day: CalendarDayBodySlotScope) => VNode[] | undefined;
export default function useEvents(props: EventProps & CategoryProps & BaseProps, ctx: SetupContext): {
    noEvents: import("vue").ComputedRef<boolean>;
    parsedEvents: import("vue").ComputedRef<CalendarEventParsed[]>;
    getScopeSlots: () => {
        day?: DayBodyScope | DayScope | undefined;
        "day-body"?: DayBodyScope | DayScope | undefined;
        "day-header"?: DayBodyScope | DayScope | undefined;
        event?: DayBodyScope | DayScope | undefined;
    };
};
