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
  errorPresent,
  id,
  name,
  onBlur,
  onChange,
  value
}) => {
  const isControlled = value !== undefined;
  const initialValue = isControlled ? value : defaultValue;
  invariant(
    initialValue !== undefined,
    'This component has no initial value'
  );

  let inputRef = useRef();
  const [isActive, setIsActive] = useState(inputRef.current === document.activeElement);
  const [dateValue, setDateValue] = useState({
    ...initialValue
  });

  const isValidKeyPress = (ev) => {
    if (Events.isNumberKey(ev) || Events.isDeletingKey(ev) || Events.isTabKey(ev)) {
      return true;
    }
    return false;
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

  const handleOnFocus = () => {
    setIsActive(true);
  };

  const handleBlur = (ev) => {
    setIsActive(false);
    if (onBlur) {
      onBlur({ name: ev.target.name, id: ev.target.id, value: { ...dateValue } });
    }
  };

  return (
    <>
      <StyledNumeralDate
        name={ name }
        id={ id }
        isActive={ isActive }
        onBlur={ handleBlur }
        onKeyPress={ onKeyPress }
        onFocus={ handleOnFocus }
        data-component='numeral-date'
      >
        {
          dateFormat.map((datePart, i) => (
            <StyledDateField
              key={ datePart }
              isYearInput={ datePart.length === 4 }
              isMiddle={ i === 1 }
              isEnd={ i === 2 }
              errorPresent={ errorPresent }
              dateFormatLength={ dateFormat.length }
            >
              <Textbox
                placeholder={ datePart }
                value={ dateValue[datePart] }
                inputRef={ (e) => { inputRef = e; } }
                onChange={ e => handleChange(e, datePart) }
                hasError={ errorPresent }
                onBlur={ handleBlur }
                {
                ...((((datePart.length === 4 && i === 2) || (i === 1)) && errorPresent) && {
                  inputIcon: 'error',
                  tooltipMessage: errorMessage
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
  dateFormat: PropTypes.arrayOf(PropTypes.string),
  /** Prop for `uncontrolled` use */
  defaultValue: PropTypes.shape({
    dd: PropTypes.string,
    mm: PropTypes.string,
    yyyy: PropTypes.string
  }),
  /** Prop for errorMessage string. */
  errorMessage: PropTypes.string,
  /** Prop for errorPresent. */
  errorPresent: PropTypes.bool,
  /** Prop for `controlled` use */
  value: PropTypes.shape({
    dd: PropTypes.string,
    mm: PropTypes.string,
    yyyy: PropTypes.string
  }),
  /** Prop for `onBlur` events */
  onBlur: PropTypes.func,
  /** Prop for `onChange` events */
  onChange: PropTypes.func,
  /** Prop for `id` events */
  id: PropTypes.string,
  /** Prop for `name` events */
  name: PropTypes.string,
  /** Prop for placeholder */
  placeholder: PropTypes.string
};

NumeralDate.defaultProps = { dateFormat: ['dd', 'mm', 'yyyy'] };

export default NumeralDate;
