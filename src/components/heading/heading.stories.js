import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Heading from './heading';

storiesOf('Heading', module)
  .add('default', () => {
    const title = text('title', 'This is a heading');
    const children = text('children', 'This is content beneath a heading');
    const titleId = text('titleId', '');
    const subheader = text('subheader', 'This is a subheading');
    const subtitleId = text('subtitleId', '');
    const help = text('help', '');
    const helpLink = text('helpLink', '');
    const backLink = text('backLink', '');
    const divider = boolean('divider', Heading.defaultProps.divider);
    const separator = boolean('separator', Heading.defaultProps.separator);

    return (
      <Heading
        children={ children }
        title={ title }
        titleId={ titleId }
        subheader={ subheader }
        subtitleId={ subtitleId }
        help={ help }
        helpLink={ helpLink }
        backLink={ backLink }
        divider={ divider }
        separator={ separator }
      >
        {children}
      </Heading>
    );
  }, {
    notes: { markdown: notes }
  });
