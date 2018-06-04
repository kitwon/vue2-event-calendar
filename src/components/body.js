export default {
  methods: {
    genWeekTitle(h) {
      const titleCls = `${this.prefixCls}-week-title`
      const titleData = this.weekDateShort || this.weekLocaleData || this.localeData[this.locale]
      let temp = this.firstDay - 1

      const titleArr = titleData.map(date => {
        if (++temp >= 7) temp = 0

        return h(
          'div',
          {
            class: [`${titleCls}-item`]
          },
          [titleData[temp]]
        )
      })

      return h(
        'div',
        {
          class: [titleCls]
        },
        [titleArr]
      )
    },
    genCalendateItem(h) {
      let tempRow = this.genItemRow(h)
      let itemArr = []
      this.monthData.map((data, index) => {
        const item = h(
          'div',
          {
            class: `${this.prefixCls}-day-item`
          },
          [
            this.$scopedSlots.default
              ? this.$scopedSlots.default(data)
              : this.$slots.default
          ]
        )

        tempRow.children.push(item)

        if (index - 1 > 0 && (index + 1) % 7 === 0) {
          itemArr.push(tempRow)
          tempRow = this.genItemRow(h)
        }
      })

      return h(
        'div',
        {
          class: [`${this.prefixCls}-body`]
        },
        [itemArr]
      )
    },
    genItemRow(h) {
      const itemRow = h(
        'div',
        {
          class: [`${this.prefixCls}-body-row`]
        },
        []
      )
      return itemRow
    }
  }
}
