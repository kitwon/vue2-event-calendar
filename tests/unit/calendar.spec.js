import { mount } from '@vue/test-utils';
import { wrap } from 'module';
import { Calendar } from '../../src';
import Header from '../../src/header';

function createDefaultWrapper({ props, mountOptions }) {
  return mount(Calendar, {
    ...mountOptions,
    sync: false,
    attachToDocument: true,
    propsData: {
      startDate: '2018-01-01',
      ...props
    }
  });
}

async function runDefaultTest(wrapper, prefix) {
  const header = wrapper.find(Header);
  const prev = header.find(`.${prefix}-prev`);
  const next = header.find(`.${prefix}-next`);
  // const title = header.find(`.${buttonPrefix}-header-date`);

  next.trigger('click');
  await header.vm.$nextTick();
  expect(wrapper.vm.$data.currentDay).toBe('2018-02-01');

  prev.trigger('click');
  await wrapper.vm.$nextTick();
  expect(wrapper.vm.$data.currentDay).toBe('2018-01-01');
}

// TODO:
// 1. test scope slots
describe('Calendar component', () => {
  it('should change currect date when clicked', async () => {
    const prefixCls = 'kit-calendar';
    const props = { prefixCls };

    const wrapper = createDefaultWrapper({ props });
    runDefaultTest(wrapper, prefixCls);
  });

  it('should render exactly when set renderHeader props ', async () => {
    const props = {
      renderHeader({ prev, next, selectedDate }) {
        return (
          <div class='custom-header'>
            <div class='custom-header-prev' onClick={prev}>prev</div>
            <span class='custom-header-header-date'>{selectedDate}</span>
            <div class='custom-header-next' onClick={next}>next</div>
          </div>
        );
      }
    };

    const wrapper = createDefaultWrapper({ props });
    runDefaultTest(wrapper, 'custom-header');
  });

  it('Event should return valid args', async () => {
    let results = [];

    const listeners = {
      next(args) {
        results = results.concat(Object.keys(args).map(k => args[k]));
      },
      prev(args) {
        results = results.concat(Object.keys(args).map(k => args[k]));
      },
      onMonthChange(args) {
        results = results.concat(Object.keys(args).map(k => args[k]));
      }
    };

    const wrapper = createDefaultWrapper({ mountOptions: { listeners } });
    wrapper.vm.next();
    wrapper.vm.prev();
    wrapper.vm.onMonthChange();
    await wrapper.vm.$nextTick();

    expect(results.length).not.toBe(0);
    expect(results).toEqual(expect.not.arrayContaining([undefined]));
  });
});
