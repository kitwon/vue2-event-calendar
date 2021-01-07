import { computed, Slots } from 'vue'

const tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
} as any

export function escapeHTML(str: string): string {
  return str.replace(/[&<>]/g, tag => tagsToReplace[tag] || tag)
}

export function genFunctionComputed<T = Function>(prop: any, func?: T) {
  return computed<T>(() => {
    return typeof prop === 'function' ? prop : func || (() => prop)
  })
}

export function genIntComputed(props: any) {
  return computed(() => parseInt(props))
}

export function convertToUnit(
  str: string | number | null | undefined,
  unit = 'px'
): string | undefined {
  if (str == null || str === '') {
    return undefined
  } else if (typeof str === 'string') {
    return String(str)
  } else {
    return `${Number(str)}${unit}`
  }
}

export function getEventName(str: string) {
  return str[2].toLowerCase() + str.slice(2)
}

/**
  In vue3, all event in jsx use on[Event] with camel-case.
  eg: `ctx.emit('customEvent')`. In jsx `<component onCustomEvent={handler} />`.

  More info
  https://v3.vuejs.org/guide/migration/render-function-api.html#_3-x-syntax-2

 * @export
 * @param {string} str
 * @returns
 */
export function getComponentEvent(str: string) {
  return `on${str[0].toUpperCase()}${str.slice(1)}`
}

export function getTriggerEventName(str: string) {
  const name = str.replace(/^on(.*)/, '$1')
  return `${name[0].toLocaleLowerCase()}${name.slice(1)}`
}

export function isCssColor(color: string) {
  return !!color && !!color.match(/^(#|var\(--|(rgb|hsl)a?\()/)
}

// Need Refactor
export function getColor(
  styleName: string | string[],
  color: string,
  data = { style: '', class: '' }
) {
  const colorObj = {
    style: [data.style] as any,
    class: [data.class] as any
  }
  if (isCssColor(color)) {
    const keys = Array.isArray(styleName) ? styleName : [styleName]
    colorObj.style.push(
      keys.reduce<Record<string, string>>((acc, key) => {
        acc[key] = color
        return acc
      }, {})
    )
  } else {
    colorObj.class.push(color)
  }

  return colorObj
}

export function getSlot(slots: Slots, name: string, data?: any) {
  const slot = slots[name]
  if (typeof slot !== 'undefined') {
    return slot(data)
  }

  return null
}
