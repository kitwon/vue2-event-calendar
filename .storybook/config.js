import { configure, setAddon } from '@storybook/vue';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.(j|t)sx?$/);
function loadStories() {
  req.keys().forEach(filename => {
    req(filename)
  });
}

configure(loadStories, module);
