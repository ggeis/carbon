import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import I18n from 'i18n-js';
import {
  PagerLinkStyles
} from './pager.styles';
import baseTheme from '../../style/themes/base';

const PagerNavigationLink = ({
  type,
  currentPage,
  totalRecords,
  maxPages,
  onClick,
  ...props
}) => {
  const navLinkConfig = {
    first: {
      text: I18n.t('pager.first', { defaultValue: 'First' }),
      destination: '1'
    },
    last: {
      text: I18n.t('pager.last', { defaultValue: 'Last' }),
      destination: maxPages
    },
    next: {
      text: I18n.t('pager.next', { defaultValue: 'Next' }),
      destination: currentPage + 1
    },
    previous: {
      text: I18n.t('pager.previous', { defaultValue: 'Previous' }),
      destination: currentPage - 1
    }
  };

  function disabled() {
    if (maxPages === 1) {
      return true;
    }
    if (currentPage === 1) {
      return type === 'previous' || type === 'first';
    }
    if (currentPage === maxPages) {
      return type === 'next' || type === 'last';
    }
    return false;
  }

  const { text } = navLinkConfig[type];

  return (
    <PagerLinkStyles
      disabled={ disabled() }
      onClick={ onClick }
      { ...props }
    >
      { text }
    </PagerLinkStyles>
  );
};

PagerNavigationLink.propTypes = {
  type: PropTypes.oneOf(['next', 'previous', 'first', 'last']).isRequired,
  /** Current visible page */
  currentPage: PropTypes.number.isRequired,
  /** Total number of records */
  totalRecords: PropTypes.number.isRequired,
  /** Pagination page size */
  maxPages: PropTypes.number.isRequired,
  /** Sets the current page being shown */
  setCurrentPage: PropTypes.func,
  /** Current theme */
  theme: PropTypes.object,
  /** Callback for the current theme name */
  setCurrentThemeName: PropTypes.func,
  onClick: PropTypes.func
};

PagerNavigationLink.defaultProps = {
  theme: baseTheme
};

export default withTheme(PagerNavigationLink);
