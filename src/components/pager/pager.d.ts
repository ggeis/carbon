import * as React from 'react';

export interface PagerPropTypes {
  onNext?: () => void;
  onFirst?: () => void;
  onPrevious?: () => void;
  onLast?: () => void;
  currentPage?: number;
  totalRecords?: number;
  onPagination?: () => void;
  pageSize?: number;
  showPageSizeSelection?: boolean;
  pageSizeSelectionOptions?: object;
  theme?: object;
}

declare const Pager: React.FunctionComponent<PagerPropTypes>;

export default Pager;
