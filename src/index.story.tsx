import { storiesOf } from '@storybook/vue';

import Calendar from './index.vue';

const stories = storiesOf('Mode', module);
stories.add('month', (): any => {
  return {
    components: { Calendar },
    template: '<Calendar />'
  };
});
