import styled, { css } from 'styled-components';
import baseTheme from '../../../style/themes/base';
import Icon from '../../icon';

const StyledFlatTableHeader = styled.th`
  ${({ align, theme }) => css`
    background-color: transparent;
    border-width: 0;
    border-bottom: 1px solid ${theme.table.secondary};
    box-sizing: border-box;
    font-weight: 700;
    left: auto;
    padding: 8px 24px;
    text-align: ${align};
    top: 0;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  `}
`;

const StyledFlatTableHeaderContent = styled.div`
  display: inline-flex;
  align-items: center;
  
  ${Icon}{
    width: 16px;
    height: 16px;
  }

 ${({ onClick, theme }) => onClick && css`
    border-bottom: 1px solid transparent;

    :hover{
      border-bottom: 1px solid #fff;
      cursor: pointer;
    };

    :focus{
      outline: 1px solid ${theme.colors.focus};
    }

  `} ;
`;

StyledFlatTableHeader.defaultProps = {
  theme: baseTheme
};

export { StyledFlatTableHeader, StyledFlatTableHeaderContent };
