import styled, { css } from 'styled-components';
import StyledValidationIcon from '../../../components/validations/validation-icon.style';
import StyledIconSpan from '../input-icon-toggle/input-icon-toggle.style';
import { baseTheme } from '../../../style/themes';
import StyledFormField from '../form-field/form-field.style';
import StyledInput from '../input/input-presentation.style';
import StyledIcon from '../../../components/icon/icon.style';

const StyledNumeralDate = styled.div`
  margin: 0px, 0px;
  display: inline-flex;
  border: 1px solid transparent;
  height: 40px;
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 2px;
  padding-top: 1px; 

  ${StyledFormField} {
     margin-top: 0px;
  }
`;

StyledNumeralDate.defaultProps = { theme: baseTheme };
export default StyledNumeralDate;

export const StyledDateField = styled.div`

  ${StyledInput} {
      position: relative;
      width: ${({
    isYearInput, isMiddle, isEnd, errorPresent
  }) => (
    // eslint-disable-next-line indent
        isYearInput || (isEnd && errorPresent) || (isMiddle && errorPresent) ? '78px;' : '58px;')};
      text-align: center;

      ${({ isMiddle, dateFormatLength }) => css`
        ${(isMiddle && dateFormatLength === 3) && css`
          border-left: none;
          border-right: none;
          :focus {
              border-left: 1px;
              border-right: 1px;
            }
        `}
        ${(isMiddle && dateFormatLength < 3) && css`
          border-left: 1px;
          :focus {
              border-left: 1px;
              border-right: 1px;
            }
        `}
      `}

     border-color: ${({ theme, errorPresent }) => (
    // eslint-disable-next-line indent
       errorPresent ? `${theme.numeralDate.error}` : `${theme.numeralDate.passive}`)}; 
    }

    ${StyledIcon} {
      display: float;
      color: ${({ theme }) => (theme.numeralDate.error)};
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    ${StyledIconSpan} {
      width: 32px;
    }

    ${StyledValidationIcon} {
      margin-left: 0px;
      padding: 0px;
    }
`;
