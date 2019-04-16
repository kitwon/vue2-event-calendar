// eslint-disable-next-line
import { storiesOf } from '@storybook/vue';

import Calendar from './index.vue';
import Data from '../dev/data';

const Template = ({ props, children }) => `
  <Calendar :dateData="dateData" ${props}>
    ${children || ''}
  </Calendar>
`;

const defaultComponent = ({ template, props }) => {
  const p = Object.keys(props || {}).reduce((prev, val) => {
    const result = typeof props[val] === 'string' ? props[val] : val;
    // eslint-disable-next-line
    return prev += `${val}="${result}" `;
  }, '');

  const tempStr = Template({
    props: p,
    children: `
      <template v-slot="{date: { date, data, isPrevMonth, isNextMonth, isToday }}">
        <div
          :class="[
            'ui-calendar-item',
            {
              'is-otherMonth': isPrevMonth || isNextMonth,
              'is-today': isToday
            },
          ]">
          <div :class="['ui-calendar-item-date']">
            {{date.date}}
          </div>
          <div
            class="ui-calendar-item-name"
            v-for="(item, index) in data"
            :key="index">
            <span>{{item.title}}</span>
          </div>
        </div>
      </template>
    `
  });

  return {
    components: { Calendar },
    template: template || tempStr,
    data() {
      return {
        dateData: Data.Object
      };
    }
  };
};

storiesOf('Mode', module)
  .add('month', () => defaultComponent({}))
  .add('week', () => defaultComponent({
    props: {
      mode: 'week'
    }
  }));

storiesOf('Locale', module)
  .add('cn', () => defaultComponent({
    props: { locale: 'zh-cn' }
  }));
