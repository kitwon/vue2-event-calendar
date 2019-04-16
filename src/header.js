export default {
  props: {
    prefixCls: {
      type: String,
      required: true
    },
    mode: String,
    renderHeader: Function,
    headerLeft: [Object, Array],
    headerRight: [Object, Array],
    currentDate: [Date, Object, String]
  },
  computed: {
    pre: vm => `${vm.prefixCls}-header`,
    headerDateText() {
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
    },
    HeaderCenter() {
      const p = this.$parent;
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
  },
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
};
