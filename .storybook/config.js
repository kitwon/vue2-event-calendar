import { configure } from '@storybook/vue';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.story.tsx$/);
function loadStories() {
  console.log(req.keys())
  req.keys().forEach(filename => {
    console.log(filename)
    req(filename)
  });
}

configure(loadStories, module);
