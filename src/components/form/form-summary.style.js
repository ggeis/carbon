import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';
import StyledIcon from '../icon/icon.style';
import StyledButton from '../button/button.style';

export const StyledFormSummary = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  margin: -8px;
  padding: 8px;
  white-space: nowrap;

  ${StyledButton} {
    margin-right: 0;
  }
 
  ${({ showSummary, theme }) => showSummary && css`
    background-color: ${theme.form.invalid};
  `}
`;

export const StyledInternalSummary = styled.span`
  padding: 0 3px;
  display: flex;
  align-items: center;
  ${({ type, theme }) => type === 'warning' && css`color: ${theme.colors.warning};`}
  ${({ type, theme }) => type === 'error' && css`color: ${theme.colors.error};`}

  ${StyledIcon} {
    padding: 0 3px;
    ${({ type, theme }) => type === 'warning' && css`color: ${theme.colors.warning};`}
    ${({ type, theme }) => type === 'error' && css`color: ${theme.colors.error};`}
  }
`;

export const StyledSummaryText = styled.span`
  padding: 0 3px;
`;

StyledFormSummary.propTypes = {
  theme: PropTypes.object,
  showSummary: PropTypes.bool
};
StyledFormSummary.defaultProps = {
  theme: baseTheme
};

StyledInternalSummary.propTypes = {
  theme: PropTypes.object,
  type: PropTypes.oneOf(['error', 'warning'])
};
StyledInternalSummary.defaultProps = {
  theme: baseTheme
};
