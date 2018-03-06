import { mount, shallow } from '@vue/test-utils';
import Calendar from '../src/index';
import data from '../dev/data';

describe('Calendar component', () => {
  test('component snapshot', () => {
    const wrapper = mount(Calendar, {
      propsData: {
        value: new Date('2018-01-01'),
        dateData: data
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test('mode is work', () => {
    const wrapper = mount(Calendar, {
      propsData: {
        value: new Date('2018-01-01')
      }
    });

    const weekWrapper = mount(Calendar, {
      propsData: {
        mode: 'week',
        value: new Date('2018-01-01')
      }
    });

    const monthRow = wrapper.findAll('.vue-calendar-body-row');
    const weekRow = weekWrapper.findAll('.vue-calendar-body-row');

    expect(monthRow.length).toBe(6);
    expect(weekRow.length).toBe(1);
  });

  test('has require props', () => {
    const { value, dateData, onMonthChange, mode, prefixCls } = Calendar.props;
    expect(value).not.toBe(undefined);
    expect(dateData).not.toBe(undefined);
    expect(onMonthChange.type).toBe(Function);
    expect(mode).not.toBe(undefined);
    expect(prefixCls.default).toBe('vue-calendar');
  });

  test('has currect change action', () => {
    const prefixCls = 'kit-calendar';
    const wrapper = shallow(Calendar, {
      propsData: {
        value: new Date('2018-01-01'),
        prefixCls
      }
    });

    const prev = wrapper.find(`.${prefixCls}-prev`);
    const next = wrapper.find(`.${prefixCls}-next`);
    const title = wrapper.find(`.${prefixCls}-header-date`);

    next.trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(title.text()).toBe('2018-02');
    });

    prev.trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(title.text()).toBe('2018-01');
    });
  });
});
