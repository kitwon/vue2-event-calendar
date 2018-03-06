export default {
  computed: {
    headerDateText() {
      if (this.mode === 'week') {
        const startDay = this.moment(this.currentDate).startOf('week').format('YYYY-MM-DD');
        const endDay = this.moment(this.currentDate).endOf('week').format('YYYY-MM-DD');
        return `${startDay} - ${endDay}`;
      } else {
        return this.moment(this.currentDate).format('YYYY-MM');
      }
    }
  },
  methods: {
    genHeaderCenter(h) {
      const prevControl = h('a', {
        class: [`${this.prefixCls}-control`, `${this.prefixCls}-prev`],
        on: {
          click: this.prev
        }
      }, [ this.prevNode || '<' ]);

      const nextControl = h('a', {
        class: [`${this.prefixCls}-control`, `${this.prefixCls}-next`],
        on: {
          click: this.next
        }
      }, [ this.nextNode || '>' ]);

      const curMonth = h('span', {
        class: [`${this.prefixCls}-header-date`]
      }, [ this.headerDateText ]);

      return h('div', {
        class: [`${this.prefixCls}-header-center`]
      }, [
        prevControl,
        curMonth,
        nextControl
      ]);
    },
    genHeader(h) {
      const headerLeft = h('div', {
        class: [`${this.prefixCls}-header-left`]
      }, [this.$slots['header-left']]);

      const headerRight = h('div', {
        class: [`${this.prefixCls}-header-right`]
      }, [this.$slots['header-right']]);

      return h('div', {
        class: [`${this.prefixCls}-header`]
      }, [
        headerLeft,
        this.genHeaderCenter(h),
        headerRight
      ]);
    }
  }
};
