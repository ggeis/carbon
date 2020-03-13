import * as React from 'react';

import { AlignBinaryType } from '../../utils/helpers/options-helper/options-helper';

export interface PopoverContainerProps {
  /** The element that will open popover-container */
  renderOpenComponent: React.ReactNode | Node;
  /** The content of the popover-container */
  children?: React.ReactNode;
  /** Sets rendering position of dialog */
  position?: AlignBinaryType;
  /** Sets the popover container dialog header name */
  title?: string;
  /** Callback fires when close icon clicked */
  onClose?: () => void;
  /** if `true` the popover-container is open */
  isOpen?: boolean;
  /** if `true` the popover-container will cover open button */
  hasStickyTop?: boolean;
}

declare const PopoverContainer: React.FunctionComponent<PopoverContainerProps>;

export default PopoverContainer;
