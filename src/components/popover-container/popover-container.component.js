import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import {
  PopoverContainerWrapperStyle,
  PopoverContainerHeaderStyle,
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon,
  PopoverContainerTitle
} from './popover-container.style';
import Icon from '../icon';
import IconButton from '../icon-button';

const PopoverContainer = ({
  children, title, position, isOpen, onClose, renderOpenComponent, renderCloseComponent, shouldCoverButton
}) => {
  const closeIconRef = useRef();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if ((open || isOpen) && closeIconRef.current) closeIconRef.current.focus();
  }, [isOpen, open]);

  const handleOpenButtonClick = () => {
    setOpen(!open);
  };

  const renderOpenComponentProps = {
    tabIndex: (open || isOpen) ? -1 : 0,
    dataElement: 'popover-container-open-component',
    handleClick: handleOpenButtonClick
  };

  const handleCloseButtonClick = () => {
    if (onClose) onClose();
    setOpen(false);
  };

  const renderOpenButton = () => {
    if (renderOpenComponent) {
      return renderOpenComponent(renderOpenComponentProps);
    }

    return (
      <IconButton
        tabIndex={ (open || isOpen) ? -1 : 0 }
        onAction={ handleOpenButtonClick }
      >
        <Icon
          data-element='popover-container-open-component'
          type='settings'
        />
      </IconButton>
    );
  };

  const renderCloseButtonProps = {
    dataElement: 'popover-container-close-icon',
    type: 'close',
    tabIndex: '0',
    handleClose: handleCloseButtonClick
  };

  const renderCloseButton = () => {
    if (renderCloseComponent) {
      return renderCloseComponent(renderCloseButtonProps);
    }

    return (
      <PopoverContainerCloseIcon
        data-element='popover-container-close-icon'
        type='close'
        tabIndex='0'
        onAction={ handleCloseButtonClick }
        ref={ closeIconRef }
      >
        <Icon type='close' />
      </PopoverContainerCloseIcon>
    );
  };

  return (
    <PopoverContainerWrapperStyle data-component='popover-container'>
      { renderOpenButton() }
      <Transition
        in={ isOpen || open }
        timeout={ { exit: 300 } }
        appear
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <PopoverContainerContentStyle
            data-element='popover-container-content'
            animationState={ state }
            position={ position }
            shouldCoverButton={ shouldCoverButton }
          >
            <PopoverContainerHeaderStyle>
              <PopoverContainerTitle data-element='popover-container-title'>
                {title}
              </PopoverContainerTitle>
              {renderCloseButton()}
            </PopoverContainerHeaderStyle>
            {children}
          </PopoverContainerContentStyle>
        )}
      </Transition>
    </PopoverContainerWrapperStyle>
  );
};

PopoverContainer.propTypes = {
  /** The element that will open popover-container */
  renderOpenComponent: PropTypes.func,
  /** The element that will close popover-container */
  renderCloseComponent: PropTypes.func,
  /** if `true` the popover-container is open */
  isOpen: PropTypes.bool,
  /** Sets the popover-container dialog header name */
  title: PropTypes.string,
  /** if `true` the popover-container will cover open button */
  shouldCoverButton: PropTypes.bool,
  /** Callback fires when close icon clicked */
  onClose: PropTypes.func,
  /** Sets rendering position of the popover-container */
  position: PropTypes.oneOf(['left', 'right']),
  /** The content of the popover-container */
  children: PropTypes.node
};

PopoverContainer.defaultProps = {
  position: 'right',
  shouldCoverButton: false
};

export default PopoverContainer;
