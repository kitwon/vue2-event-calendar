import useBase from '../useBase'
import Calendar from '../../Calendar'
import { parseTimestamp } from '../../util/timestamp'
import { mount } from '@vue/test-utils'
import { BaseProps } from '../../util/props'
// import { ExtractVue } from '../../../../util/mixins'

export function getWrapper(props: Partial<BaseProps>) {
  return mount(Calendar, {
    props: props
  })
}

export function getProps(props: Partial<BaseProps>) {
  return getWrapper(props).vm.$props
}

describe('calendar-base.ts', () => {
  it('should parse start & end', async () => {
    const props = getProps({
      start: '2020-12-28',
      end: '2021-01-08'
    })
    const instance = useBase(props)

    expect(instance.parsedStart.value).toBeDefined()
    expect(instance.parsedStart.value).toMatchSnapshot()
    expect(instance.parsedEnd.value).toBeDefined()
    expect(instance.parsedEnd.value).toMatchSnapshot()
  })

  it('should create a day list', async () => {
    const props = getProps({
      start: '2020-12-28',
      end: '2021-01-08'
    })
    console.log(props)
    const instance = useBase(props)

    expect(instance.days.value).toBeDefined()
    expect(instance.days.value).toHaveLength(12)
    expect(instance.days.value).toMatchSnapshot()

    expect(instance.days.value[0].date).toBe('2020-12-28')
    expect(instance.days.value[10].date).toBe('2021-01-07')
  })

  it('should calculate weekday skips', async () => {
    const props = getProps({
      start: '2020-12-28',
      end: '2021-01-08'
    })
    const instance = useBase(props)

    expect(instance.weekdaySkips.value).toBeDefined()
    expect(instance.weekdaySkips.value).toHaveLength(7)
  })

  it('should generate classes', async () => {
    const props = getProps({
      start: '2020-12-28',
      end: '2021-01-08'
    })
    const instance = useBase(props)

    expect(
      instance.getRelativeClasses(parseTimestamp('2020-12-28'))
    ).toBeDefined()
    expect(
      instance.getRelativeClasses(parseTimestamp('2020-12-29'))
    ).toMatchSnapshot()
  })

  it('should generate classes with outside', async () => {
    const props = getProps({
      start: '2020-12-28',
      end: '2021-01-08'
    })
    const instance = useBase(props)

    expect(
      instance.getRelativeClasses(parseTimestamp('2020-12-28'), true)
    ).toBeDefined()
    expect(
      instance.getRelativeClasses(parseTimestamp('2020-12-28'), true)
    ).toMatchSnapshot()
  })

  it('should return weekdayFormatter equal to weekdayFormat prop', async () => {
    const weekdayFormat = (x: any) => x
    const instance = useBase({
      weekdayFormat
    })

    expect(instance.weekdayFormatter.value).toEqual(weekdayFormat)
  })

  it('should long-format weekday', async () => {
    const props = getProps({
      start: '2020-12-28',
      end: '2021-01-08'
    })
    const instance = useBase(props)

    expect(instance.weekdayFormatter.value).toBeDefined()
    expect(typeof instance.weekdayFormatter.value).toEqual('function')

    expect(
      instance.weekdayFormatter.value(parseTimestamp('2020-12-28'), false)
    ).toEqual('Monday')
    expect(
      instance.weekdayFormatter.value(parseTimestamp('2020-12-27'), false)
    ).toEqual('Sunday')
    expect(
      instance.weekdayFormatter.value(parseTimestamp('2020-12-28'), false)
    ).toEqual('Monday')
  })

  it('should short-format weekday', async () => {
    const props = getProps({})
    const instance = useBase(props)

    expect(instance.weekdayFormatter.value).toBeDefined()
    expect(typeof instance.weekdayFormatter.value).toEqual('function')

    expect(
      instance.weekdayFormatter.value(parseTimestamp('2020-12-26'), true)
    ).toEqual('Sat')
    expect(
      instance.weekdayFormatter.value(parseTimestamp('2020-12-28'), true)
    ).toEqual('Mon')
    expect(
      instance.weekdayFormatter.value(parseTimestamp('2020-12-29'), true)
    ).toEqual('Tue')
  })

  it('should get start of week', async () => {
    const props = getProps({})
    const instance = useBase(props)

    expect(
      instance.getStartOfWeek(parseTimestamp('2020-12-20')).weekday
    ).toEqual(0)
    expect(
      instance.getStartOfWeek(parseTimestamp('2019-01-27')).weekday
    ).toEqual(0)
  })

  it('should get end of week', async () => {
    const props = getProps({})
    const instance = useBase(props)

    expect(instance.getEndOfWeek(parseTimestamp('2020-12-8')).weekday).toEqual(
      6
    )
    expect(instance.getEndOfWeek(parseTimestamp('2020-12-29')).weekday).toEqual(
      6
    )
  })

  it('should return dayFormatter equal to dayFormat prop', async () => {
    const dayFormat = (x: any) => x
    const props = getProps({
      dayFormat
    })
    const instance = useBase(props)

    expect(typeof instance.dayFormatter.value).toEqual('function')
  })

  it('should format day', async () => {
    const props = getProps({
      start: '2020-12-28',
      end: '2021-01-08'
    })
    const instance = useBase(props)

    expect(instance.weekdayFormatter.value).toBeDefined()
    expect(typeof instance.weekdayFormatter.value).toEqual('function')

    expect(
      instance.dayFormatter.value(parseTimestamp('2019-01-28'), false)
    ).toEqual('28')
    expect(
      instance.dayFormatter.value(parseTimestamp('2019-01-27'), false)
    ).toEqual('27')
    expect(
      instance.dayFormatter.value(parseTimestamp('2020-12-28'), false)
    ).toEqual('28')
  })
})
