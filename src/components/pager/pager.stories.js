import React from 'react';
import {
  boolean,
  number,
  withKnobs
} from '@storybook/addon-knobs';
import Immutable from 'immutable';
import { action } from '@storybook/addon-actions';
import Pager from '.';

export default {
  title: 'Test/Pager',
  component: Pager,
  decorators: [withKnobs],
  parameters: {
    info: {
      disable: true
    },
    knobs: { escapeHTML: false }
  }
};

export const Basic = () => {
  const handlePagination = () => {
    action('onPagination');
  };

  const handleOnNext = () => {
    action('onNext');
  };

  const handleOnPrevious = () => {
    action('onPrevious');
  };

  const handleOnFirst = () => {
    action('onFirst');
  };

  const handleOnLast = () => {
    action('onLast');
  };

  const totalRecords = number('totalRecords', 100);
  const showPageSizeSelection = boolean(
    'showPageSizeSelection',
    Pager.defaultProps.showPageSizeSelection
  );

  return (
    <Pager
      showPageSizeSelection={ showPageSizeSelection }
      totalRecords={ totalRecords }
      onPagination={ handlePagination }
      onNext={ handleOnNext }
      onPrevious={ handleOnPrevious }
      onFirst={ handleOnFirst }
      onLast={ handleOnLast }
      pageSizeSelectionOptions={
        Immutable.fromJS([
          { id: '1', name: 1 },
          { id: '10', name: 10 },
          { id: '25', name: 25 },
          { id: '50', name: 50 },
          { id: '100', name: 100 }
        ])
      }
    />
  );
};
