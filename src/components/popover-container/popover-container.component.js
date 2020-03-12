import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import {
  PopoverContainerHeaderStyle,
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon,
  PopoverContainerTitle
} from './popover-container.style';
import Icon from '../icon';

const PopoverContainer = ({
  children, title, position, isOpen, onClose, isStickyTop
}) => {
  const closeIconRef = useRef();

  useEffect(() => {
    if (isOpen) closeIconRef.current.focus();
  }, [isOpen]);

  return (
    <Transition
      in={ isOpen }
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
          isStickyTop={ isStickyTop }
        >
          <PopoverContainerHeaderStyle>
            <PopoverContainerTitle data-element='popover-container-title'>
              {title}
            </PopoverContainerTitle>
            <PopoverContainerCloseIcon
              data-element='popover-container-close-icon'
              type='close'
              tabIndex='0'
              onAction={ onClose }
              ref={ closeIconRef }
            >
              <Icon type='close' />
            </PopoverContainerCloseIcon>
          </PopoverContainerHeaderStyle>
          {children}
        </PopoverContainerContentStyle>
      )}
    </Transition>
  );
};

PopoverContainer.propTypes = {
  /** Set visibility of the popover */
  isOpen: PropTypes.bool.isRequired,
  /** Sets the popover container dialog header name */
  title: PropTypes.string.isRequired,
  /** Sets rendering position of dialog */
  position: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node
};

export default PopoverContainer;
