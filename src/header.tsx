import { VNode } from 'vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Dayjs } from 'dayjs';

@Component
export default class Header extends Vue {
  @Prop({
    type: String,
    required: true
  }) prefixCls!: string;
  @Prop(String) mode!: string;
  @Prop(Function) renderHeader!: IRenderHeader;
  @Prop(Function) headerLeft!: VNode;
  @Prop(Function) headerRight!: VNode;
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
    const Content = this.renderHeader
      ? this.renderHeader({
          prev,
          next,
          selectedDate: this.headerDateText
        })
      : (<div class={`${p.pre}-center`}>
          <a class={[`${p.pre}-control`, `${p.pre}-prev`]}
            onClick={prev}>
            {'<'}
          </a>
          <span class={`${p.pre}-date`}>{this.headerDateText}</span>
          <a class={[`${p.pre}-control`, `${p.pre}-next`]}
            onClick={next}>
            {'>'}
          </a>
        </div>);
    return Content;
  }

  render() {
    return (
      <div class={this.pre}>
        <div class={`${this.pre}-left`}>
          { this.headerLeft }
        </div>

        { this.HeaderCenter }

        <div class={`${this.pre}-right`}>
          { this.headerRight }
        </div>
      </div>
    );
  }
}
