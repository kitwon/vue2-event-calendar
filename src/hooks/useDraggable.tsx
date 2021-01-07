import "./Draggable.scss";

import { CalendarEvent, CalendarEventScope, CalendarTimestamp } from "../types";
import { reactive, Ref } from "vue";

interface DefaultEvent {
  name: string;
  start: number;
  end: number;
  timed: boolean;
}

interface DraggableState<T = DefaultEvent> {
  dragStart: number | null;
  dragTime: number | null;
  dragEvent: T | DefaultEvent | null;
  createStart: number | null;
  createEvent: T | DefaultEvent | null;
  extendOriginal: number | null;
}

export type EventFormatter<T> = (
  start: number,
  end: number,
  timeStamp?: CalendarTimestamp
) => T;

export interface DraggableOptions<T> {
  genEvent?: EventFormatter<T>;
  eventStart: string;
  eventEnd: string;
  roundNumber: number;
}

const defaultFormatter: EventFormatter<DefaultEvent> = (start, end) => {
  return {
    name: "添加日程",
    start,
    end,
    timed: true
  };
};

export default function useDraggable<D = DefaultEvent>(
  events: Ref<Array<D | DefaultEvent>>,
  options: DraggableOptions<D> = {
    eventStart: "start",
    eventEnd: "end",
    roundNumber: 15
  }
) {
  const state: DraggableState<D> = reactive({
    dragStart: null,
    dragEvent: null,
    dragTime: null,
    createStart: null,
    createEvent: null,
    extendOriginal: null
  });

  /**
   * Get round of selected time, defulat step size is `roundNumber = 15`
   *
   * @param {number} time - timestamp
   * @param {boolean} down - up or down
   */
  const roundTime = (time: number, down = true) => {
    const roundTo = options.roundNumber; // minutes
    const roundDownTime = roundTo * 60 * 1000;

    return down
      ? time - (time % roundDownTime)
      : time + (roundDownTime - (time % roundDownTime));
  };

  const getTime = ({ year, month, day, hour, minute }: CalendarTimestamp) => {
    return new Date(year, month - 1, day, hour, minute).getTime();
  };

  const startDragEvent = (
    { event, timed }: CalendarEventScope<D>,
    e: MouseEvent
  ) => {
    if (event && timed && e.button !== 2) {
      state.dragEvent = event;
      state.dragTime = null;
      state.extendOriginal = null;
    }
  };

  const startDragTime = (timestamp: CalendarTimestamp, e: MouseEvent) => {
    if (e.button === 2) return;

    const mousePos = getTime(timestamp);
    const { dragEvent, dragTime } = state;

    if (dragEvent && dragTime === null) {
      const start = (dragEvent as DefaultEvent).start;
      state.dragTime = mousePos - start;
    } else {
      state.createStart = roundTime(mousePos);
      state.createEvent = options?.genEvent
        ? options.genEvent(state.createStart, state.createStart, timestamp)
        : defaultFormatter(state.createStart, state.createStart);

      events.value.push(state.createEvent);
    }
  };

  const moveTime = (tms: CalendarTimestamp) => {
    const mousePos = getTime(tms);
    const { dragEvent, dragTime, createEvent, createStart } = state;
    const { eventStart, eventEnd } = options;

    if (dragEvent && dragTime !== null) {
      const start = (dragEvent as any)[eventStart];
      const end = (dragEvent as any)[eventEnd];
      const duration = end - start;
      const newStartTime = mousePos - dragTime;
      const newStart = roundTime(newStartTime);
      const newEnd = newStart + duration;
      (state.dragEvent as any)[eventStart] = newStart;
      (state.dragEvent as any)[eventEnd] = newEnd;
    } else if (createEvent && createStart !== null) {
      const mouseRounded = roundTime(mousePos, false);
      const min = Math.min(mouseRounded, createStart);
      const max = Math.max(mouseRounded, createStart);
      (state.createEvent as any)[eventStart] = min;
      (state.createEvent as any)[eventEnd] = max;
    }
  };

  const endDrag = () => {
    Object.keys(state).forEach(k => {
      (state as any)[k] = null;
    });
  };

  const dragBottom = (event: D) => {
    state.createEvent = event;
    state.createStart = (event as any)[options.eventStart];
    state.extendOriginal = (event as any)[options.eventEnd];
  };

  const cancelDrag = () => {
    const { extendOriginal } = state;
    if (state.createEvent) {
      if (extendOriginal) {
        (state.createEvent as any)[options.eventStart] = extendOriginal;
      } else {
        const i = events.value.indexOf(state.createEvent);
        if (i !== -1) {
          events.value.splice(i, 1);
        }
      }
    }
  };

  const renderEvent = ({
    event,
    timed,
    eventSummary
  }: CalendarEventScope<D>) => {
    return (
      <>
        <div class="v-event-draggable">{eventSummary()}</div>
        {timed && (
          <div
            class="v-event-drag-bottom"
            onMousedown={e => {
              e.stopPropagation();
              dragBottom(event);
            }}
          ></div>
        )}
      </>
    );
  };

  return {
    state,
    startDragEvent,
    startDragTime,
    moveTime,
    endDrag,
    dragBottom,
    cancelDrag,
    renderEvent
  };
}

export function DraggableEvent(props: {
  data: CalendarEventScope;
  handleDragBottom: (e: CalendarEvent) => void;
}) {
  const { data, handleDragBottom } = props;
  return (
    <>
      <div class="v-event-draggable">{data.eventSummary()}</div>
      {data.timed && (
        <div
          class="v-event-drag-bottom"
          onMousedown={e => {
            e.stopPropagation();
            handleDragBottom(data.event);
          }}
        ></div>
      )}
    </>
  );
}
