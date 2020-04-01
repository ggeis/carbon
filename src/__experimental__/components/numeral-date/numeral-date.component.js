import React, { useState } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import Events from '../../../utils/helpers/events';
import { StyledNumeralDate, StyledDateField } from './numeral-date.style';
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

  const [isActive, setIsActive] = useState();
  const [dateValue, setDateValue] = useState({
    ...initialValue
  });

  const onKeyPress = (ev) => {
    const isValidKey = Events.isNumberKey(ev) || Events.isDeletingKey(ev) || Events.isTabKey(ev);

    if (!isValidKey) {
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
    const targetObject = {
      name: ev.target.name,
      id: ev.target.id,
      value: { ...dateValue }
    };

    setIsActive(false);

    if (onBlur) {
      onBlur(targetObject);
    }
  };

  return (
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
        dateFormat.map((datePart, textboxNumber) => {
          const isEnd = textboxNumber === dateFormat.length - 1;
          return (
            <StyledDateField
              key={ datePart }
              isYearInput={ datePart.length === 4 }
              isMiddle={ textboxNumber === 1 }
              isEnd={ isEnd }
              twoPartDate={ textboxNumber <= 1 }
              errorPresent={ errorPresent }
              dateFormatLength={ dateFormat.length }
            >
              <Textbox
                placeholder={ datePart }
                value={ dateValue[datePart] }
                onChange={ e => handleChange(e, datePart) }
                hasError={ errorPresent }
                onBlur={ handleBlur }
                {
                ...(isEnd && errorPresent && {
                  inputIcon: 'error',
                  tooltipMessage: errorMessage
                })
                }
              />
            </StyledDateField>
          );
        })
      }
    </StyledNumeralDate>
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
  value: PropTypes.object,
  /** Prop for `onBlur` events */
  onBlur: PropTypes.func,
  /** Prop for `onChange` events */
  onChange: PropTypes.func,
  /** Prop for `id` events */
  id: PropTypes.string,
  /** Prop for `name` events */
  name: PropTypes.string,
  /** Prop for placeholder */
  // eslint-disable-next-line react/no-unused-prop-types
  placeholder: PropTypes.string
};

NumeralDate.defaultProps = { dateFormat: ['dd', 'mm', 'yyyy'] };

export default NumeralDate;
