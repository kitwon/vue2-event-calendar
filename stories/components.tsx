import './index.scss'
import dayjs from 'dayjs'

import { defineComponent, reactive, ref, render } from 'vue'
import Calendar from '../src'
import props from '../src/util/props'
import { useCurrentInterval } from '../src/hooks/useCurrentInterval'
import useDraggable from '../src/hooks/useDraggable'
import genEvents from './utils/gen-events'

export const Common = defineComponent({
  props: {
    type: String,
    ...props.events,
    ...props.base
  },
  setup(props) {
    const instance = ref(null)
    const data = reactive({
      focus: ''
    })

    const prev = () => {
      ;(instance.value as any).prev()
    }
    const next = () => {
      ;(instance.value as any).next()
    }

    return () => (
      <div>
        <div class="flex flex-align-center border-bottom pb-4">
          <div class="btn is-ghost is-round" onClick={prev}>
            {'<'}
          </div>
          <div class="btn is-ghost is-round ml-3" onClick={next}>
            {'>'}
          </div>
          <div class="btn mx-5" onClick={() => (data.focus = '')}>
            today
          </div>
          <div>{data.focus}</div>
        </div>

        <Calendar
          v-model={data.focus}
          ref={instance}
          {...props}
          style={{ height: '700px' }}
        ></Calendar>
      </div>
    )
  }
})

export const WithInterval = defineComponent({
  name: 'DailyWithIntervals',
  setup() {
    const { calendar, renderDayBody } = useCurrentInterval()

    return () => (
      <Calendar
        style={{ height: '400px' }}
        ref={calendar}
        v-slots={{
          'day-body': renderDayBody
        }}
      ></Calendar>
    )
  }
})

export const WithDraggable = defineComponent({
  name: 'DailyWithDraggable',
  setup() {
    const date = dayjs()
    const nextDate = date.add(7, 'day')
    const events = ref(
      genEvents(date.format('YYYY-MM-DD'), nextDate.format('YYYY-MM-DD'), 30)
    )
    const {
      startDragEvent,
      startDragTime,
      endDrag,
      moveTime,
      renderEvent,
      cancelDrag
    } = useDraggable(events)

    return () => (
      <Calendar
        events={events.value}
        style={{ height: '700px' }}
        {...{
          'onMousedown:event': startDragEvent,
          'onMousedown:time': startDragTime,
          'onMousemove:time': moveTime,
          'onMouseup:time': endDrag,
          onMouseleave: cancelDrag
        }}
        v-slots={{ event: renderEvent }}
      ></Calendar>
    )
  }
})
