import React, { useState, useRef } from 'react';
import { select, text, boolean } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import PopoverContainer from './popover-container.component';
import Button from '../button';
import IconButton from '../icon-button';
import Icon from '../icon';
import Pill from '../pill';
import { DraggableContainer, DraggableItem } from '../draggable';
import { Checkbox } from '../../__experimental__/components/checkbox';
import Link from '../link';
import Badge from '../badge';

export default {
  component: PopoverContainer,
  title: 'Test/Popover Container',
  parameters: {
    info: { disable: true },
    knobs: { escapeHTML: false }
  }
};

const storyStyle = (height = '80px', position = 'right') => ({
  minHeight: height,
  marginLeft: position === 'left' ? '400px' : null
});

export const Basic = () => {
  const title = text('title', 'Popover Title');
  const iconType = select('iconType', [...OptionsHelper.icons], 'settings');
  const position = select('position', [...OptionsHelper.alignBinary], 'right');
  const hasStickyTop = boolean('hasStickyTop', true);

  const [isOpen, setOpen] = useState(false);
  const iconRef = useRef(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    iconRef.current.focus();
  };

  return (
    <div style={ storyStyle(undefined, position) }>
      <PopoverContainer
        title={ title }
        position={ position }
        isOpen={ isOpen }
        onClose={ handleClose }
        hasStickyTop={ hasStickyTop }
        renderOpenComponent={ () => (
          <IconButton
            ref={ iconRef }
            data-element='popover-container-icon'
            onAction={ handleClick }
          >
            <Icon type={ iconType } />
          </IconButton>
        ) }
      />
    </div>
  );
};

export const Filter = () => {
  const initValues = [
    {
      value: 'Option 1',
      checked: false
    },
    {
      value: 'Option 2',
      checked: false
    },
    {
      value: 'Option 3',
      checked: false
    }
  ];

  const [isOpen, setOpen] = useState(false);
  const [options, setOptions] = useState(initValues);
  const [filters, setFilters] = useState([]);

  const clearAllOptions = () => {
    const temps = options;

    for (let i = 0; i < temps.length; i++) {
      temps[i].checked = false;
    }

    setOptions([...temps]);
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const updateCheckValue = (e) => {
    const temps = options;
    const findCorrectIndex = temps.findIndex(item => item.value === e.target.value);

    if (findCorrectIndex !== -1) {
      temps[findCorrectIndex].checked = !temps[findCorrectIndex].checked;

      setOptions([...temps]);
    }
  };

  const updateFilters = () => setFilters(options.filter(filter => filter.checked === true));

  const handleClick = () => {
    setOpen(!isOpen);
  };

  const handleBadgeClose = () => {
    clearAllOptions();
    clearFilters();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const applyFilters = () => {
    updateFilters();
    handleClose();
  };

  const renderCheckboxes = () => {
    const checkboxStyle = {
      marginBottom: '10px'
    };

    return options.map((option, index) => {
      return (
        <Checkbox
          onChange={ updateCheckValue }
          style={ checkboxStyle }
          label={ option.value }
          name={ option.value }
          value={ option.value }
          checked={ option.checked }
          key={ index }
        />
      );
    });
  };

  const renderPills = () => {
    const pillStyle = {
      margin: '0 8px'
    };

    return filters.map((filter, index) => {
      return filter.checked ? <Pill key={ index } style={ pillStyle }>{filter.value}</Pill> : null;
    });
  };

  return (
    <div style={ storyStyle('250px') }>
      <PopoverContainer
        title='How to create Filter component'
        isOpen={ isOpen }
        renderOpenComponent={ ({ tabIndex, dataElement }) => (
          <Badge counter={ filters.length } onClick={ handleBadgeClose }>
            <Button
              tabIndex={ tabIndex }
              data-element={ dataElement }
              style={ { marginRight: 0 } }
              buttonType={ isOpen ? 'primary' : 'darkBackground' }
              iconPosition='after'
              iconType={ !isOpen ? 'filter_new' : 'close' }
              onClick={ handleClick }
              size='small'
            >
            Filter
            </Button>
          </Badge>
        ) }
      >
        {renderCheckboxes()}
        <Button onClick={ applyFilters } style={ { margin: '20px 0' } }>Apply</Button>
      </PopoverContainer>
      {renderPills()}
    </div>
  );
};

export const UncontrolledPopoverContainer = () => {
  return (
    <div style={ storyStyle() }>
      <PopoverContainer
        title='How to use custom HTML element'
        renderOpenComponent={ ({ handleClick }) => (
          <button
            type='button'
            onClick={ handleClick }
          >
            Open here
          </button>
        ) }
      />
    </div>
  );
};

export const CustomElement = () => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={ storyStyle() }>
      <PopoverContainer
        title='How to use custom HTML element'
        isOpen={ isOpen }
        onClose={ handleClose }
        renderOpenComponent={ () => (
          <button
            type='button'
            onClick={ handleClick }
          >
            Open here
          </button>
        ) }
      />
    </div>
  );
};

export const WithComplexContent = () => {
  const [isOpen, setOpen] = useState(false);
  const iconRef = useRef();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    iconRef.current.focus();
  };

  return (
    <div style={ storyStyle('330px') }>
      <PopoverContainer
        title='Popover Container Title'
        isOpen={ isOpen }
        onClose={ handleClose }
        hasStickyTop
        renderOpenComponent={ () => (
          <IconButton
            ref={ iconRef }
            data-element='popover-container-icon'
            onAction={ handleClick }
          >
            <Icon type='settings' />
          </IconButton>
        ) }
      >
        <Link>This is example link text</Link>
        <div style={ { padding: '25px 0 15px 0' } }>
          <Button>
            Small
          </Button>
          <Button>
            Compact
          </Button>
        </div>
        <DraggableContainer>
          <DraggableItem key='1' id={ 1 }>
            <Checkbox name='one' label='Draggable Label One' />
          </DraggableItem>
          <DraggableItem key='2' id={ 2 }>
            <Checkbox name='two' label='Draggable Label Two' />
          </DraggableItem>
          <DraggableItem key='3' id={ 3 }>
            <Checkbox name='three' label='Draggable Label Three' />
          </DraggableItem>
          <DraggableItem key='4' id={ 4 }>
            <Checkbox name='four' label='Draggable Label Four' />
          </DraggableItem>
        </DraggableContainer>
      </PopoverContainer>
    </div>
  );
};
