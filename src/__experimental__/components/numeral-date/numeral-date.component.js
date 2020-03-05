import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import Events from '../../../utils/helpers/events';
import StyledNumeralDate, { StyledDateField } from './numeral-date.style';
import Textbox from '../textbox';

const NumeralDate = ({
  dateFormat,
  defaultValue,
  errorMessage,
  errorState,
  id,
  name,
  onChange,
  placeholder,
  value
}) => {
  const isControlled = value !== undefined;
  const initialValue = isControlled ? value : defaultValue;
  invariant(
    typeof initialValue === 'string',
    'This component has no initial value'
  );

  let inputRef = useRef();
  const [errorSate, setErrorState] = useState(false);
  const [dateValue, setDateValue] = useState({
    dd: '', mm: '', yyyy: ''
  }); // value date textbox field.

  // eslint-disable-next-line consistent-return
  const isValidKeyPress = (ev) => {
    if (Events.isNumberKey(ev) || Events.isDeletingKey(ev) || Events.isTabKey(ev)) return true;
  };

  const onKeyPress = (ev) => {
    if (!isValidKeyPress(ev)) {
      ev.preventDefault();
    }
  };

  const handleChange = (e, itemId) => {
    if (onChange) {
      onChange(e);
    }
    if (e.target.value !== dateValue[itemId]) {
      setDateValue({ ...dateValue, [itemId]: e.target.value });
    }
  };

  return (
    <>
      <StyledNumeralDate
        name={ name }
        id={ id }
      >
        {
          dateFormat.map((datePart, i) => (
            <StyledDateField
              key={ datePart }
              placeholder={ datePart }
              isMiddle={ i === 1 }
              isEnd={ i === 2 }
              errorState={ errorState }
            >
              <Textbox
                placeholder={ datePart }
                value={ dateValue[datePart] }
                inputRef={ (e) => { inputRef = e; } }
                onKeyPress={ onKeyPress }
                onChange={ e => handleChange(e, datePart) }
                hasError={ errorState }
                {
                ...(i === 2 && {
                  inputIcon: 'error',
                  tooltipMessage: 'errorState: true'
                })
                }
              />
            </StyledDateField>))
        }
      </StyledNumeralDate>
    </>
  );
};

NumeralDate.propTypes = {
  /** Prop array string to define custom layout. Use a comma to seperate values. */
  dateFormat (props, propName) {
    let error;
    if ((props[propName] && typeof props[propName] === 'string') || props[propName].length > 3) {
      error = new Error('Length of array exceeds three.');
    }
    return error;
  },
  /** Prop for `uncontrolled` use */
  defaultValue: PropTypes.number,
  /** Prop for errorMessage string. */
  errorMessage: PropTypes.string,
  /** Prop for errorState. */
  errorState: PropTypes.bool,
  /** Prop for `controlled` use */
  value: PropTypes.arrayOf(PropTypes.number),
  /** Prop for `onChange` events */
  onChange: PropTypes.func,
  /** Prop for `id` events */
  id: PropTypes.string,
  /** Prop for `name` events */
  name: PropTypes.string,
  /** Prop for placeholder */
  placeholder: PropTypes.string
};

export default NumeralDate;
