declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>

  export default component
}

declare global {
  import Vue, { VNode } from 'vue'

  namespace JSX {
    type Element = VNode
    type ElementClass = Vue
    interface IntrinsicElements {
      [elem: string]: any
    }
  }

  function parseInt(s: number | string): number
  function parseFloat(s: number | string): number
}
