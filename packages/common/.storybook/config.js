import { configure } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { setAddon } from '@storybook/react';

setAddon(JSXAddon);

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
