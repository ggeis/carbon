import React from 'react';
import PropTypes from 'prop-types';
import FormFieldStyle from './form-field.style';
import Label from '../label';
import FieldHelp from '../field-help';
import OptionsHelper from '../../../utils/helpers/options-helper';

const FormField = ({
  children,
  disabled,
  fieldHelp,
  fieldHelpInline,
  hasError,
  label,
  labelAlign,
  labelHelp,
  labelHelpIcon,
  labelInline,
  labelWidth,
  name,
  reverse,
  size,
  childOfForm,
  isOptional
}) => (
  <FormFieldStyle inline={ labelInline }>
    {reverse && children}

    {label && (
      <Label
        align={ labelAlign }
        disabled={ disabled }
        hasError={ hasError }
        help={ labelHelp }
        htmlFor={ name }
        helpIcon={ labelHelpIcon }
        inline={ labelInline }
        inputSize={ size }
        width={ labelWidth }
        childOfForm={ childOfForm }
        optional={ isOptional }
      >
        {label}
      </Label>
    )}

    {fieldHelp && fieldHelpInline && (
      <FieldHelp labelInline={ labelInline } labelWidth={ labelWidth }>
        {fieldHelp}
      </FieldHelp>
    )}

    {!reverse && children}

    {fieldHelp && !fieldHelpInline && (
      <FieldHelp labelInline={ labelInline } labelWidth={ labelWidth }>
        {fieldHelp}
      </FieldHelp>
    )}
  </FormFieldStyle>
);

FormField.defaultProps = {
  size: 'medium'
};

FormField.propTypes = {
  children: PropTypes.node,
  childOfForm: PropTypes.bool,
  disabled: PropTypes.bool,
  fieldHelp: PropTypes.node,
  fieldHelpInline: PropTypes.bool,
  hasError: PropTypes.bool,
  isOptional: PropTypes.bool,
  label: PropTypes.node,
  labelAlign: PropTypes.oneOf(OptionsHelper.alignBinary),
  labelHelp: PropTypes.node,
  labelHelpIcon: PropTypes.string,
  labelInline: PropTypes.bool,
  labelWidth: PropTypes.number,
  name: PropTypes.string,
  reverse: PropTypes.bool,
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted)
};

export default FormField;
