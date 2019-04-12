import { VNodeChildren } from 'vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Dayjs } from 'dayjs';
import { IRenderHeader } from './types/index';

@Component({
  name: 'CalendarHeader'
})
export default class Header extends Vue {
  @Prop({
    type: String,
    required: true
  }) prefixCls!: string;
  @Prop(String) mode!: string;
  @Prop(Function) renderHeader!: IRenderHeader;
  @Prop(Array) headerLeft!: VNodeChildren;
  @Prop(Array) headerRight!: VNodeChildren;
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

  get HeaderCenter() {
    const p: any = this.$parent;
    const { prev, next } = p;
    const { prefixCls } = this;
    const Content = this.renderHeader
      ? this.renderHeader({
          prev,
          next,
          selectedDate: this.headerDateText
        })
      : (<div class={`${prefixCls}-header-center`}>
          <a class={[`${prefixCls}-control`, `${prefixCls}-prev`]}
            onClick={prev}>
            {'<'}
          </a>
          <span class={`${prefixCls}-header-date`}>{this.headerDateText}</span>
          <a class={[`${prefixCls}-control`, `${prefixCls}-next`]}
            onClick={next}>
            {'>'}
          </a>
        </div>);
    return Content;
  }

  render() {
    const { prefixCls } = this;
    return (
      <div class={`${prefixCls}-header`}>
        <div class={`${prefixCls}-header-left`}>
          { this.headerLeft }
        </div>

        { this.HeaderCenter }

        <div class={`${prefixCls}-header-right`}>
          { this.headerRight }
        </div>
      </div>
    );
  }
}
