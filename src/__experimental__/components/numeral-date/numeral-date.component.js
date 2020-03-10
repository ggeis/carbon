import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import Events from '../../../utils/helpers/events';
import DateHelper from '../../../utils/helpers/date';
import StyledNumeralDate, { StyledDateField } from './numeral-date.style';
import Textbox from '../textbox';

const NumeralDate = ({
  dateFormat,
  defaultValue,
  errorMessage,
  // errorState,
  id,
  name,
  onBlur,
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
  const [isActive, setIsActive] = useState(inputRef.current === document.activeElement);
  const [errorState, setErrorState] = useState(false);
  const [dateValue, setDateValue] = useState({
    dd: '', mm: '', yyyy: ''
  }); // value date textbox field

  // For validating dates
  const handleDateValidation = () => {
    const { dd, mm, yyyy } = dateValue;
    const dateIsEmpty = !yyyy.length || !mm.length || !dd.length;
    const dateValueString = dateIsEmpty ? '' : `${yyyy}-${mm}-${dd}`;

    if (!dateIsEmpty) {
      if (!DateHelper.isValidDate(dateValueString)) {
        setErrorState(true);
      } else setErrorState(false);
    }
  };

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
    handleDateValidation();
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
        onFocus={ handleOnFocus }
        onKeyPress={ onKeyPress }
      >
        {
          dateFormat.map((datePart, i) => (
            <StyledDateField
              key={ datePart }
              isYearInput={ datePart.length === 4 }
              isMiddle={ i === 1 }
              isEnd={ i === 2 }
              errorState={ errorState }
            >
              <Textbox
                placeholder={ datePart }
                value={ dateValue[datePart] }
                inputRef={ (e) => { inputRef = e; } }
                onChange={ e => handleChange(e, datePart) }
                hasError={ errorState }
                onBlur={ handleBlur }
                {
                ...((i === 2 && errorState) && {
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
  value: PropTypes.string,
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

// // have an array of inputRefs
// // pass in ref[i] to each textbox
// // in onBlur check if Events.composedPath(e).includes(any of the refs) e.stopPropagation()
// onBlur={ (e) => {
//   if (refs.some(ref => Events.composedPath(e).includes(ref.current))) {
//     e.stopPropagation();
//   } else {
//     refs.forEach(r => console.log(r.current));
//   }
// } }
