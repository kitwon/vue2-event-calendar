<template>
  <div :class="pre">
    <div :class="`${pre}-left`">
      <slot name="header-left" />
    </div>
    <header-center />
    <div :class="`${pre}-right`">
      <slot name="header-right" />
    </div>
  </div>
</template>


<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VNode } from 'vue';
import { Dayjs } from 'dayjs';

@Component({
  components: {
    HeaderCenter: {
      render() {
        const p: any = this.$parent;
        const { prev, next } = p.$parent;
        const Content = p.renderContent
          ? p.renderContent({
              prev,
              next,
              selectedDate: p.headerDateText
            })
          : (<div class={`${p.pre}-center`}>
              <a class={[`${p.pre}-control`, `${p.pre}-prev`]}
                onClick={prev}>
                {'<'}
              </a>
              <span class={`${p.pre}-date`}>{p.headerDateText}</span>
              <a class={[`${p.pre}-control`, `${p.pre}-next`]}
                onClick={next}>
                {'>'}
              </a>
            </div>);
        return Content;
      }
    }
  }
})
export default class Header extends Vue {
  @Prop({
    type: String,
    required: true
  }) prefixCls!: string;
  @Prop(String) mode!: string;
  @Prop(Function) renderHeader!: IRenderHeader;
  @Prop(Object) currentDate!: Dayjs;

  get headerDateText() {
    if (this.mode === 'week') {
      const s = this.currentDate
        .startOf('week')
        .format('YYYY-MM-DD');
      const e = this.currentDate
        .endOf('week')
        .format('YYYY-MM-DD');
      return `${s} - ${e}`;
    }

    return this.currentDate.format('YYYY-MM');
  }

  get pre() {
    return `${this.prefixCls}-header`;
  }
}

</script>
