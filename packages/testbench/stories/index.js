//
// Copyright 2018 DXOS.org
//

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { factory } from './FeedStoreStory';

storiesOf('Testbench', module)

  // https://github.com/storybooks/storybook/tree/master/addons/knobs
  .addDecorator(withKnobs)

  // https://storybook.js.org/docs/configurations/options-parameter
  .addParameters({
    options: {
      showPanel: true,
      panelPosition: 'right'
    }
  })

  .add('FeedStore', () => factory());
