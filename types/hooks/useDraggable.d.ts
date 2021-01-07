import './Draggable.scss';
import { CalendarEvent, CalendarEventScope, CalendarTimestamp } from '../types';
import { Ref } from 'vue';
interface DefaultEvent {
    name: string;
    start: number;
    end: number;
    timed: boolean;
}
export declare type EventFormatter<T> = (start: number, end: number, timeStamp?: CalendarTimestamp) => T;
export interface DraggableOptions<T> {
    genEvent?: EventFormatter<T>;
    eventStart: string;
    eventEnd: string;
    roundNumber: number;
}
export declare function useDraggable<D = DefaultEvent>(events: Ref<Array<D | DefaultEvent>>, options?: DraggableOptions<D>): {
    startDragEvent: ({ event, timed }: CalendarEventScope<D>, e: MouseEvent) => void;
    startDragTime: (timestamp: CalendarTimestamp, e: MouseEvent) => void;
    moveTime: (tms: CalendarTimestamp) => void;
    endDrag: () => void;
    dragBottom: (event: D) => void;
    cancelDrag: () => void;
    renderEvent: ({ event, timed, eventSummary }: CalendarEventScope<D>) => JSX.Element;
};
export declare function DraggableEvent(props: {
    data: CalendarEventScope;
    handleDropBottom: (e: CalendarEvent) => void;
}): JSX.Element;
export {};
