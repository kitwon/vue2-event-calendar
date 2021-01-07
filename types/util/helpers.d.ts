import { Slots } from 'vue';
export declare function escapeHTML(str: string): string;
export declare function genFunctionComputed<T = Function>(prop: any, func?: T): import("vue").ComputedRef<T>;
export declare function genIntComputed(props: any): import("vue").ComputedRef<number>;
export declare function convertToUnit(str: string | number | null | undefined, unit?: string): string | undefined;
export declare function getEventName(str: string): string;
/**
  In vue3, all event in jsx use on[Event] with camel-case.
  eg: `ctx.emit('customEvent')`. In jsx `<component onCustomEvent={handler} />`.

  More info
  https://v3.vuejs.org/guide/migration/render-function-api.html#_3-x-syntax-2

 * @export
 * @param {string} str
 * @returns
 */
export declare function getComponentEvent(str: string): string;
export declare function getTriggerEventName(str: string): string;
export declare function isCssColor(color: string): boolean;
export declare function getColor(styleName: string | string[], color: string, data?: {
    style: string;
    class: string;
}): {
    style: any;
    class: any;
};
export declare function getSlot(slots: Slots, name: string, data?: any): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | null;
