// eslint-disable-next-line
/* eslint import/no-extraneous-dependencies: 0 */
import { storiesOf } from '@storybook/vue';
import { actions } from '@storybook/addon-actions';

import { Calendar } from './index';
import getCalendarData from '../dev/data';

const Data = getCalendarData(new Date(2019, 4, 28));

const defaultSlots = (createElement) => {
  // eslint-disable-next-line
  const h = createElement;
  return {
    scopedSlots: {
      default: (props) => {
        const {
          date: {
            date, data, isPrevMonth, isNextMonth, isToday
          }
        } = props;
        return (
          <div class={['ui-calendar-item', {
            'is-otherMonth': isPrevMonth || isNextMonth,
            'is-today': isToday
          }]}>
            <div class="ui-calendar-item-date">
              {date.date}
            </div>

            {data.map((item, index) => (
              <div
                class="ui-calendar-item-name"
                key={index}>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        );
      }
    }
  };
};
const defaultProps = (createElement) => {
  // eslint-disable-next-line
  const h = createElement;
  return {
    props: {
      dateData: Data.Array
    },
    on: {
      ...actions({
        prev: 'prev button clicked',
        next: 'next button clicked',
        onMonthChange: 'month changed'
      })
    },
    ...defaultSlots(createElement)
  };
};

storiesOf('Calendar', module)
  .add('default', () => ({
    render: h => <Calendar {...defaultProps(h)} />
  }))

  .add('week mode', () => ({
    render: h => <Calendar mode="week" {...defaultProps(h)} />
  }))

  .add('change firstday', () => ({
    render: h => <Calendar startDate={new Date(2019, 7)} firstDay={1} {...defaultProps(h)} />
  }))

  .add('change firstday in week mode', () => ({
    render: h => <Calendar startDate={new Date(2019, 5, 16)} firstDay={1} mode="week" {...defaultProps(h)} />
  }))

  .add('custom week header', () => ({
    render: h => <Calendar weekLocaleData={'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_')} {...defaultProps(h)} />
  }))

  .add('locale', () => ({
    render: h => <Calendar locale="zh-cn" {...defaultProps(h)} />
  }))

  .add('custom header', () => ({
    render(h) {
      const createheader = ({ prev, next, selectedDate }) => (
        <div style="display: flex">
          <button onClick={prev}>prev</button>
          <div>{selectedDate}</div>
          <button onClick={next}>next</button>
        </div>
      );

      return (<Calendar renderHeader={createheader} {...defaultProps(h)} />);
    }
  }));
