import React, { useState, useRef } from 'react';
import { select, text, boolean } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import PopoverContainer from './popover-container.component';
import Button from '../button';
import IconButton from '../icon-button';
import Icon from '../icon';

export default {
  component: PopoverContainer,
  title: 'Test/Popover Container',
  parameters: {
    info: { disable: true },
    knobs: { escapeHTML: false }
  }
};

export const Basic = () => {
  const title = text('title', 'Popover Title');
  const position = select('position', [...OptionsHelper.alignBinary], 'right');
  const isStickyTop = boolean('isStickyTop', false);

  const iconRef = useRef();
  const [isOpen, setOpen] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={ position === 'left' ? { marginLeft: '400px' } : null }>
      <IconButton
        ref={ iconRef }
        data-element='popover-container-icon'
        tabIndex={ isOpen ? -1 : 0 }
        onAction={ handleOpen }
      >
        <Icon type='settings' />
      </IconButton>
      <PopoverContainer
        title={ title }
        position={ position }
        isOpen={ isOpen }
        // onClose shouldn't be required! Find another way for this
        onClose={ handleClose }
        buttonRef={ iconRef }
        isStickyTop={ isStickyTop }
      />
    </div>
  );
};

export const ButtonExample = () => {
  const title = text('title', 'Popover Title');
  const position = select('position', [...OptionsHelper.alignBinary], 'right');
  const isStickyTop = boolean('isStickyTop', false);

  const buttonRef = useRef();
  const [isOpen, setOpen] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={ position === 'left' ? { marginLeft: '400px' } : null }>
      <Button
        ref={ buttonRef }
        as='secondary'
        buttonType='darkBackground'
        iconPosition='after'
        iconType='filter_new'
        onClick={ handleOpen }
        size='small'
        theme='blue'
      >
        Filter
      </Button>
      <PopoverContainer
        title={ title }
        position={ position }
        isOpen={ isOpen }
        onClose={ handleClose }
        isStickyTop={ isStickyTop }
      />
    </div>
  );
};
