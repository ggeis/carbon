import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import Immutable from 'immutable';
import PagerNavigation from './pager-navigation.component';
import {
  PagerContainerStyles,
  PagerSizeOptionsStyles,
  PagerSummaryStyles,
  PagerSizeOptionsInnerStyles
} from './pager.styles';
import Dropdown from '../../__deprecated__/components/dropdown';

const Pager = ({
  currentPage,
  pageSizeSelectionOptions,
  pageSize,
  showPageSizeSelection,
  totalRecords,
  onPagination,
  onNext,
  onFirst,
  onPrevious,
  onLast,
  ...props
}) => {
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(Pager.defaultProps.currentPage);
  const [currentPageSize, setCurrentPageSize] = useState(Pager.defaultProps.pageSize);

  useEffect(() => {
    setPage(currentPage);
    setPageCount(Math.ceil(totalRecords / currentPageSize));
  }, [currentPage, totalRecords, currentPageSize]);

  /** Term used to describe table data */
  const records = count => I18n.t(
    'pager.records',
    {
      count: Number(count),
      defaultValue: {
        one: 'item',
        other: 'items'
      }
    }
  );

  const handleOnFirst = useCallback((e) => {
    if (page !== 1) {
      setPage(1);
    }

    if (onFirst) {
      onFirst(e);
    }
  }, [page, onFirst]);

  const handleOnLast = useCallback((e) => {
    if (page !== pageCount) {
      setPage(pageCount);
    }

    if (onLast) {
      onLast(e);
    }
  }, [page, pageCount, onLast]);

  const handleOnNext = useCallback((e) => {
    const nextPage = page + 1;
    if (nextPage <= pageCount) {
      setPage(nextPage);
    }

    if (onNext) {
      onNext(e);
    }
  }, [onNext, page, pageCount]);

  const handleOnPrevious = useCallback((e) => {
    const previousPage = page - 1;
    if (previousPage > 0) {
      setPage(previousPage);
    }

    if (onPrevious) {
      onPrevious(e);
    }
  }, [page, onPrevious]);

  const handleOnPagination = useCallback((e) => {
    setCurrentPageSize(Number(e.target.value));

    if (onPagination) {
      onPagination(e);
    }
  }, [onPagination]);

  function sizeSelector() {
    return (
      <Dropdown
        options={ pageSizeSelectionOptions }
        value={ currentPageSize }
        onChange={ (ev) => { handleOnPagination(ev); } }
        data-element='page-select'
      />
    );
  }

  function pageSizeOptions() {
    const show = I18n.t('pager.show', { defaultValue: 'Show' });
    const elem = (
      <PagerSizeOptionsInnerStyles>
        <span>{ show }</span>{ sizeSelector() }<span>{ records(currentPageSize) }</span>
      </PagerSizeOptionsInnerStyles>
    );

    return showPageSizeSelection ? elem : null;
  }

  return (
    <PagerContainerStyles data-component='pager'>
      <PagerSizeOptionsStyles>{pageSizeOptions()}</PagerSizeOptionsStyles>
      <PagerNavigation
        { ...props }
        pageSize={ currentPageSize }
        currentPage={ page || Pager.defaultProps.currentPage }
        setCurrentPage={ setPage }
        totalRecords={ totalRecords || 0 }
        onNext={ handleOnNext }
        onPrevious={ handleOnPrevious }
        onFirst={ handleOnFirst }
        onLast={ handleOnLast }
      />
      <PagerSummaryStyles>{ totalRecords || 0 } { records(totalRecords) }</PagerSummaryStyles>
    </PagerContainerStyles>
  );
};

Pager.propTypes = {
  onNext: PropTypes.func,
  onFirst: PropTypes.func,
  onPrevious: PropTypes.func,
  onLast: PropTypes.func,
  /** Current visible page */
  currentPage: PropTypes.number,
  /** Total number of records */
  totalRecords: PropTypes.number.isRequired,
  /** Function called when pager changes (PageSize, Current Page) */
  onPagination: PropTypes.func.isRequired,
  /** Pagination page size */
  pageSize: PropTypes.number,
  /** Should the page size selection dropdown be shown */
  showPageSizeSelection: PropTypes.bool,
  /** Set of page size options */
  pageSizeSelectionOptions: PropTypes.object,
  /** Current theme */
  theme: PropTypes.object
};

Pager.defaultProps = {
  currentPage: 1,
  pageSize: 10,
  showPageSizeSelection: false,
  pageSizeSelectionOptions: Immutable.fromJS([
    { id: '10', name: 10 },
    { id: '25', name: 25 },
    { id: '50', name: 50 },
    { id: '100', name: 100 }
  ])
};

export default Pager;
