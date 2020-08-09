//
// Copyright 2018 DXOS.org
//

import { configure } from '@storybook/react';

function loadStories () {
  require('../stories');
}

configure(loadStories, module);
