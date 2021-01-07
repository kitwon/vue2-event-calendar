import { Directive, DirectiveBinding, DirectiveHook } from 'vue'

type ResizeCallback = () => void

interface ResizeValue {
  cb?: ResizeCallback
  options?: boolean | AddEventListenerOptions
}

const inserted: DirectiveHook = (
  el,
  binding: DirectiveBinding<ResizeValue>
) => {
  if (!binding.value) return

  let options: boolean | AddEventListenerOptions = { passive: true }
  let callback = null
  if (typeof binding.value === 'function') {
    callback = binding.value
  } else {
    callback = binding.value.cb
    options = binding.value.options || options
  }

  if (!callback) return

  window.addEventListener('resize', callback, options)
  ;(el as any)._onResize = {
    callback,
    options
  }

  if (binding.modifiers.quite) {
    callback()
  }
}

function unbind(el: any) {
  if (!el._onResize) return

  const { callback, options } = el._onResize
  window.removeEventListener('resize', callback, options)
  delete el._onResize
}

export const Resize: Directive = {
  mounted: inserted,
  unmounted: unbind
}

export default Resize
