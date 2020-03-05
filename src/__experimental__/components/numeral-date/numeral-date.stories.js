import React from 'react';
import {
  array,
  boolean,
  withKnobs
} from '@storybook/addon-knobs';
import { Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import NumeralDate from '.';
import Textbox from '../textbox';

export default {
  title: 'Test/Numeral-date',
  component: NumeralDate,
  decorators: [withKnobs],
  parameters: {
    info: {
      disable: true
    },
    knobs: { escapeHTML: false }
  }
};

export const Basic = () => {
  const store = new Store({
    value: ''
  });

  const handleChange = (ev) => {
    store.set({ value: ev.target.value });
    action('change')(ev);
  };

  const handleBlur = (ev) => {
    action('blur')(ev);
  };

  const dateFormat = array('dateFormat', ['dd', 'mm', 'yyyy']);

  return (
    <NumeralDate
      onChange={ handleChange }
      errorState={ boolean('errorState') }
      onBlur={ handleBlur }
      dateFormat={ dateFormat }
      value={ store.get('value') }
      name='numeralDate_name'
      id='numeralDate_id'
    >
      {<Textbox />}
    </NumeralDate>
  );
};
