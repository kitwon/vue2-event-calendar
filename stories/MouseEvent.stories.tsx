import { actions } from '@storybook/addon-actions'
import { defineComponent, reactive } from 'vue'
import Calendar from '../src'
import { getEventMap } from '../src/hooks/useMouse'

export default {
  title: 'MouseEvent'
}

function genEventMap(suffix: string) {
  const events = getEventMap(suffix)
  const action = actions(
    ...Object.keys(events)
      .filter(k => !/(move|enter|leave)/.test(k))
      .map(String)
  )

  return action
}

const Block = defineComponent({
  name: 'EventContainer',
  props: {
    type: {
      type: String,
      default: 'week'
    },
    eventType: {
      type: String,
      default: 'interval'
    }
  },
  setup(props) {
    const d = reactive({
      event: '',
      time: {} as any
    })

    return () => (
      <Calendar
        style={{ height: '750px' }}
        type={props.type}
        {...genEventMap(props.eventType)}
      ></Calendar>
    )
  }
})

// Main stories.
export const IntervalEvent = () => <Block eventType=":interval" />
export const HeaderEvent = () => <Block eventType=":day" />
export const TimeEvent = () => <Block eventType=":time" />
