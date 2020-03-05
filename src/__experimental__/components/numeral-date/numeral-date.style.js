import styled from 'styled-components';
import StyledToolTip from '../../../components/tooltip/tooltip-pointer.style';
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
        z-index: 100;
        width: ${({ placeholder }) => (placeholder === 'yyyy' ? '78px;' : '58px;')};
        text-align: center;

        ${({ isMiddle }) => isMiddle && `
            border-left: none;
            border-right: none;
        `}

        border-color: ${({ theme, errorState }) => (
    errorState ? `${theme.numeralDate.error}` : `${theme.numeralDate.passive}`)}; 
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

    ${StyledToolTip} {
        margin-left: 0px;
    }

`;
