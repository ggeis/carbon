import styled from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import InputPresentationStyle from '../input/input-presentation.style';
import dateClassicStyle from './date-classic.style';
import OptionsHelper from '../../../utils/helpers/options-helper';

const StyledDateInput = styled.div`
  display: inline-block;
  & ${InputPresentationStyle} {
    flex: none;
    width: ${({ size }) => (size === 'large' ? '140px' : '135px')};
  }

  ${dateClassicStyle}
`;

StyledDateInput.propTypes = {
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted)
};

StyledDateInput.defaultProps = {
  theme: baseTheme
};

export default StyledDateInput;
