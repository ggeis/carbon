import React, { useState } from 'react';
import {
  array,
  boolean,
  withKnobs,
  text
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import NumeralDate from '.';
import Textbox from '../textbox';

export default {
  title: 'Test/Numeral Date',
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
  const [dateValue, setDateValue] = useState({});
  const dateFormat = array('dateFormat', NumeralDate.defaultProps.dateFormat);


  const handleChange = (ev, itemId) => {
    setDateValue({ ...dateValue, [itemId]: ev.target.value });
    action('change')(ev);
  };

  const handleBlur = (ev) => {
    action('blur')(ev);
  };

  return (
    <NumeralDate
      onChange={ handleChange }
      errorPresent={ boolean('errorPresent') }
      errorMessage={ text('errorMessage', 'Invalid format (DD/MM/YYYY)') }
      onBlur={ handleBlur }
      dateFormat={ dateFormat }
      value={ dateValue }
      name='numeralDate_name'
      id='numeralDate_id'
    >
      {<Textbox />}
    </NumeralDate>
  );
};
