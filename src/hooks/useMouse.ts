import { getComponentEvent, getTriggerEventName } from '../util/helpers'
import { SetupContext } from 'vue'

export type EventHandler = (e: MouseEvent | TouchEvent) => any

export type MouseEvents = {
  [event: string]: {
    event: string
    passive?: boolean
    capture?: boolean
    once?: boolean
    stop?: boolean
    prevent?: boolean
    button?: number
    result?: any
  }
}

export type MouseEventsMap = {
  [event: string]: EventHandler | EventHandler[]
}

export function getEventMap(suffix: string) {
  return {
    ['onClick' + suffix]: { event: 'click' },
    ['onContextmenu' + suffix]: {
      event: 'contextmenu',
      prevent: true,
      result: false
    },
    ['onMousedown' + suffix]: { event: 'mousedown' },
    ['onMousemove' + suffix]: { event: 'mousemove' },
    ['onMouseup' + suffix]: { event: 'mouseup' },
    ['onMouseenter' + suffix]: { event: 'mouseenter' },
    ['onMouseleave' + suffix]: { event: 'mouseleave' },
    ['onTouchstart' + suffix]: { event: 'touchstart' },
    ['onTouchmove' + suffix]: { event: 'touchmove' },
    ['onTouchend' + suffix]: { event: 'touchend' }
  }
}

export default function useMouse(ctx: SetupContext) {
  const getMouseEventHandlers = (
    events: MouseEvents,
    getEvent: EventHandler
  ): MouseEventsMap => {
    const on: MouseEventsMap = {}

    for (const event in events) {
      const eventOptions = events[event]

      if (!ctx.attrs[event]) continue

      const handler: EventHandler = e => {
        const mouseEvent: MouseEvent = e as MouseEvent
        if (
          eventOptions.button === undefined ||
          (mouseEvent.buttons > 0 && mouseEvent.button === eventOptions.button)
        ) {
          if (eventOptions.prevent) {
            e.preventDefault()
          }
          if (eventOptions.stop) {
            e.stopPropagation()
          }
          ctx.emit(getTriggerEventName(event), getEvent(e), e)
        }

        return eventOptions.result
      }

      const key = getComponentEvent(eventOptions.event)
      if (key in on) {
        if (Array.isArray(on[key])) {
          ;(on[key] as EventHandler[]).push(handler)
        } else {
          on[key] = [on[key], handler] as EventHandler[]
        }
      } else {
        on[key] = handler
      }
    }

    return on
  }

  const getDefaultMouseEventHandlers = (
    suffix: string,
    getEvent: EventHandler
  ): MouseEventsMap => {
    return getMouseEventHandlers(getEventMap(suffix), getEvent)
  }

  return { getDefaultMouseEventHandlers }
}
