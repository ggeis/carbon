import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../../utils/helpers/options-helper';
import { StyledFlatTableHeader, StyledFlatTableHeaderContent } from './flat-table-header.style';

const FlatTableHeader = ({ align, children, onClick }) => {
  return (
    <StyledFlatTableHeader
      onClick={ onClick ? () => onClick(children) : null }
      align={ align }
      data-element='flat-table-header'
    >
      <StyledFlatTableHeaderContent>
        { children }
      </StyledFlatTableHeaderContent>
    </StyledFlatTableHeader>
  );
};

FlatTableHeader.propTypes = {
  /** Content alignment */
  align: PropTypes.oneOf(OptionsHelper.alignFull),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

FlatTableHeader.defaultProps = {
  align: 'left'
};

export default FlatTableHeader;
