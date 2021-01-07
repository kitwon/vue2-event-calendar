import props from '../../src/util/props'

export default function genArgType() {
  return Object.keys(props).map(category => {
    return Object.keys((props as any)[category]).map(key => {
      return {}
    })
  })
}

export const category = {
  daily: '日/周 视图',
  event: '日历事件'
}

export const CalendarArgs = {
  type: {
    description: '日历类型',
    defaultValue: 'month',
    control: {
      type: 'select',
      options: ['month', 'day', 'week']
    },
    table: {
      defaultValue: {
        summary: 'month'
      }
    }
  },
  weekdays: {
    description: '日历一周内天排列顺序',
    control: {
      type: 'text'
    },
    table: {
      defaultValue: {
        summary: '0,1,2,3,4,5,6'
      },
      type: {
        summary: ['string', 'array']
      }
    }
  },
  hideHeader: {
    description: '是否隐藏头部',
    control: {
      type: 'boolean'
    },
    table: {
      type: {
        summary: 'boolean'
      }
    }
  },
  shortIntervals: {
    description: '简写时间',
    defaultValue: false,
    table: {
      category: category.daily,
      type: {
        summary: 'boolean'
      }
    },
    control: {
      type: 'boolean'
    }
  },
  // maxDays: {
  //   description: '日历显示天数',
  //   control: {
  //     type: 'number'
  //   },
  //   table: {
  //     category: category.daily,
  //     defaultValue: {
  //       summary: '7'
  //     },
  //     type: {
  //       summary: 'number'
  //     }
  //   }
  // },
  eventOverlapMode: {
    description: '事件堆叠模式',
    defaultValue: 'stack',
    control: {
      type: 'select',
      options: ['stack', 'column']
    },
    table: {
      category: category.event,
      type: {
        summary: ['string', 'func']
      }
    }
  }
}
