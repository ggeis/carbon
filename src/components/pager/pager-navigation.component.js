import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import {
  PagerNavigationStyles,
  PagerNavInnerStyles,
  PagerNoSelectStyles
} from './pager.styles';
import NumberInput from '../../__experimental__/components/number';
import Events from '../../utils/helpers/events';
import PagerNavigationLink from './pager-navigation-link.component';

const PagerNavigation = ({
  currentPage,
  pageSize,
  totalRecords,
  onFirst,
  onPrevious,
  onLast,
  onNext,
  setCurrentPage,
  ...props
}) => {
  const updatePageFromInput = (ev) => {
    let newPage = Math.abs(Number(ev.target.value));

    if (Number(newPage) === 0 || Number.isNaN(newPage)) newPage = '1';
    else if (newPage > maxPages()) newPage = maxPages();

    setCurrentPage(newPage);
  };

  function maxPages() {
    const totalRecordsCount = totalRecords >= 0 ? totalRecords : 0;

    if (pageSize && pageSize !== '0' && totalRecordsCount > 0) {
      return Math.ceil(totalRecordsCount / pageSize);
    }
    return 1;
  }

  function handlePageInputChange(ev) {
    setCurrentPage(Number(ev.target.value));
  }

  function currentPageInput() {
    const currentPageInputProps = {
      value: currentPage,
      className: 'carbon-pager__current-page',
      'data-element': 'current-page',
      onChange: handlePageInputChange,
      onBlur: updatePageFromInput,
      onKeyUp: (ev) => {
        if (!Events.isEnterKey(ev)) {
          return false;
        }
        return updatePageFromInput(ev);
      }
    };

    return (
      <label>
        <NumberInput { ...currentPageInputProps } />
      </label>
    );
  }

  const pagerNavigationLinkProps = {
    currentPage,
    pageSize,
    totalRecords,
    maxPages: maxPages()
  };

  return (
    <PagerNavigationStyles { ...props }>
      <PagerNavigationLink
        type='first'
        onClick={ onFirst }
        { ...pagerNavigationLinkProps }
      />
      <PagerNavigationLink
        type='previous'
        onClick={ onPrevious }
        { ...pagerNavigationLinkProps }
      />
      <PagerNavInnerStyles>
        <PagerNoSelectStyles>
          { I18n.t('pager.page_x', { defaultValue: 'Page ' }) }
        </PagerNoSelectStyles>
        { currentPageInput() }
        <PagerNoSelectStyles>
          { I18n.t('pager.of_y', { defaultValue: ' of ' }) }{ maxPages() }
        </PagerNoSelectStyles>
      </PagerNavInnerStyles>
      <PagerNavigationLink
        type='next'
        onClick={ onNext }
        { ...pagerNavigationLinkProps }
      />
      <PagerNavigationLink
        type='last'
        onClick={ onLast }
        { ...pagerNavigationLinkProps }
      />
    </PagerNavigationStyles>
  );
};

PagerNavigation.propTypes = {
  /** Current visible page */
  currentPage: PropTypes.number.isRequired,
  /** Total number of records */
  totalRecords: PropTypes.number.isRequired,
  /** Pagination page size */
  pageSize: PropTypes.number,
  /** Sets the current page being shown */
  setCurrentPage: PropTypes.func,
  onFirst: PropTypes.func,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  onLast: PropTypes.func
};

export default PagerNavigation;
