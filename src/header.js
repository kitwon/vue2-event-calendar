import getMonthViewStartDay from './date-func';

export default {
  props: {
    prefixCls: {
      type: String,
      required: true
    },
    mode: String,
    firstDay: {
      required: true
    },
    renderHeader: Function,
    headerLeft: [Object, Array],
    headerRight: [Object, Array],
    currentDate: [Date, Object, String]
  },
  computed: {
    pre: vm => `${vm.prefixCls}-header`,
    headerDateText() {
      const { currentDate, firstDay, mode } = this;
      if (this.mode === 'week') {
        const startDate = getMonthViewStartDay(
          currentDate,
          firstDay,
          mode,
        );
        const s = startDate.format('YYYY-MM-DD');
        const e = startDate.add(6, 'd').format('YYYY-MM-DD');
        return `${s} - ${e}`;
      }

      return currentDate.format('YYYY-MM');
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
