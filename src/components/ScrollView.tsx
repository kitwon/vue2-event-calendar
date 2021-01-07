// Styles
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import './ScrollView.scss'

import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref
} from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'
import { convertToUnit } from '../util/helpers'

export default defineComponent({
  name: 'ScrollView',
  props: {
    height: [String, Number]
  },
  setup() {
    const instance = ref<PerfectScrollbar | null>(null)
    // ref is Element when use in render function
    const scrollRef = ref<any>(null)

    onMounted(() => {
      instance.value = new PerfectScrollbar(scrollRef.value as Element)
    })

    onUpdated(() => {
      instance.value && instance.value.update()
    })

    onBeforeUnmount(() => {
      instance.value?.destroy()
      instance.value = null
    })

    return {
      scrollRef
    }
  },
  render() {
    return (
      <div
        class="v-scroll-view"
        style={{ height: convertToUnit(this.$props.height) }}
      >
        <div ref={el => (this.scrollRef = el)} class="v-scroll-view-content">
          {this.$slots.default && this.$slots.default()}
        </div>
      </div>
    )
  }
})
