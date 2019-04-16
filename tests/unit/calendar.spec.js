import { mount } from '@vue/test-utils';
import Calendar from '../../src/index.vue';
import Header from '../../src/header';
// import data from '../../dev/data';

async function createDefaultWrapper({
  buttonPrefix, props, mountOptions, handleMounted
}) {
  const wrapper = mount(Calendar, {
    ...mountOptions,
    sync: false,
    attachToDocument: true,
    propsData: {
      startDate: '2018-01-01',
      ...props
    }
  });

  if (!handleMounted) {
    const header = wrapper.find(Header);
    const prev = header.find(`.${buttonPrefix}-prev`);
    const next = header.find(`.${buttonPrefix}-next`);
    // const title = header.find(`.${buttonPrefix}-header-date`);

    next.trigger('click');
    await header.vm.$nextTick();
    expect(wrapper.vm.$data.currentDay).toBe('2018-02-01');

    prev.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.currentDay).toBe('2018-01-01');
  } else {
    handleMounted(wrapper);
  }
}

// TODO:
// 1. test scope slots
describe('Calendar component', () => {
  it('should change currect date when clicked', async () => {
    const prefixCls = 'kit-calendar';
    const props = { prefixCls };

    await createDefaultWrapper({ buttonPrefix: prefixCls, props });
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

    await createDefaultWrapper({ buttonPrefix: 'custom-header', props });
  });

  // it('scoped-slot should match snapshot', () => {
  //   const component = {
  //     components: { Calendar },
  //     template: `
  //       <Calendar :startDate="startDate" :dateData="data">
  //         <template v-slot="dateItem">
  //           <div>
  //             <span>{{dateItem.date.date}} {{dateItem}}</span>
  //             <div
  //               v-for="(item, index) in dateItem.data"
  //               :key="index">
  //               {{ item.title }}
  //             </div>
  //           </div>
  //         </template>
  //       </Calendar>
  //     `,
  //     data() {
  //       return {
  //         startDate: '2018-1-1',
  //         data: [
  //           {
  //             date: '2018-1-1',
  //             title: 'test scope-slot1'
  //           },
  //           {
  //             date: '2018-1-5',
  //             title: 'test scope-slot2'
  //           }
  //         ]
  //       };
  //     }
  //   };

  //   // console.log(shallow(component).element)
  //   expect(mount(component).element).toMatchSnapshot();
  // });
});
