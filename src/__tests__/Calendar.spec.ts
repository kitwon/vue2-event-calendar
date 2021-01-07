import Calendar from '../Calendar'
import { mount, MountingOptions } from '@vue/test-utils'
import { BaseProps } from '../util/props'

const mountFunction = (options?: MountingOptions<Partial<BaseProps>>) => {
  return mount(Calendar, {
    ...options
  })
}

describe('VCalendar', () => {
  it('should render day view', async () => {
    const wrapper = mountFunction({
      props: {
        type: 'day',
        start: '2019-01-29',
        end: '2019-02-04',
        now: '2020-12-20'
      }
    })

    expect(wrapper.classes('v-calendar-daily')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render week view', async () => {
    const wrapper = mountFunction({
      props: {
        type: 'week',
        start: '2018-01-29',
        end: '2018-02-04',
        now: '2019-02-17'
      }
    })

    expect(wrapper.classes('v-calendar-daily')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render month view', async () => {
    const wrapper = mountFunction({
      props: {
        type: 'month',
        start: '2018-01-29',
        end: '2018-02-04',
        now: '2019-02-17'
      }
    })

    expect(wrapper.classes('v-calendar-month')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should parse value', async () => {
    const wrapper = mountFunction({
      props: {
        modelValue: '2019-02-02',
        start: '2019-01-29',
        end: '2019-02-04'
      }
    })

    expect(wrapper.vm.parsedValue.date).toBe('2019-02-02')
  })

  it('should parse start', async () => {
    const wrapper = mountFunction({
      props: {
        start: '2019-01-29',
        end: '2019-02-04'
      }
    })

    expect(wrapper.vm.parsedValue.date).toBe('2019-01-29')
  })

  it('should go to correct day when using next/prev public functions', async () => {
    const wrapper = mountFunction({
      props: {
        modelValue: '2020-12-10',
        type: 'day',
        weekdays: [1, 2, 3, 4, 5]
      }
    })

    // const input = jest.fn(value => wrapper.setProps({ value }))
    // wrapper.vm.$attrs('input', input)

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.next()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.prev()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
