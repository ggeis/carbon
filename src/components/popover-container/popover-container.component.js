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

const PopoverContainer = ({
  children, title, position, isOpen, onClose, renderOpenComponent, hasStickyTop
}) => {
  const closeIconRef = useRef();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if ((open || isOpen) && onClose) closeIconRef.current.focus();
  }, [isOpen, onClose, open]);

  const handleOpenButtonClick = () => {
    setOpen(!open);
  };

  const renderOpenComponentProps = {
    tabIndex: (open || isOpen) ? -1 : 0,
    dataElement: 'popover-container-open-component',
    handleClick: handleOpenButtonClick
  };

  return (
    <PopoverContainerWrapperStyle data-component='popover-container'>
      {renderOpenComponent(renderOpenComponentProps)}
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
            hasStickyTop={ hasStickyTop }
          >
            <PopoverContainerHeaderStyle>
              <PopoverContainerTitle data-element='popover-container-title'>
                {title}
              </PopoverContainerTitle>
              {onClose && (
                <PopoverContainerCloseIcon
                  data-element='popover-container-close-icon'
                  type='close'
                  tabIndex='0'
                  onAction={ onClose }
                  ref={ closeIconRef }
                >
                  <Icon type='close' />
                </PopoverContainerCloseIcon>
              )
              }
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
  renderOpenComponent: PropTypes.func.isRequired,
  /** if `true` the popover-container is open */
  isOpen: PropTypes.bool,
  /** Sets the popover-container dialog header name */
  title: PropTypes.string,
  /** if `true` the popover-container will cover open button */
  hasStickyTop: PropTypes.bool,
  /** Callback fires when close icon clicked */
  onClose: PropTypes.func,
  /** Sets rendering position of the popover-container */
  position: PropTypes.oneOf(['left', 'right']),
  /** The content of the popover-container */
  children: PropTypes.node
};

PopoverContainer.defaultProps = {
  position: 'right',
  hasStickyTop: false
};

export default PopoverContainer;
