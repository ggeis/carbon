import React, { useState, useCallback } from 'react';
import { action } from '@storybook/addon-actions';
import Drawer from '.';

export default {
  title: 'Test/Drawer',
  component: Drawer
};

export const basic = () => {
  return (
    <Drawer
      expandedWidth='40%'
      onChange={ action('expansionToggled') }
      sidebar={ (
        <ul>
          <li>link a</li>
          <li>link b</li>
          <li>link c</li>
        </ul>
      ) }
    >
      content body content body content body content body content body content body content body
    </Drawer>
  );
};

basic.story = {
  name: 'Basic',
  parameters: {
    info: { disable: true },
    docs: {
      page: null
    }
  }
};

export const Controlled = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const onChangeHandler = useCallback(() => {
    setIsExpanded(!isExpanded);
    action('expansionToggled');
  }, [isExpanded]);

  return (
    <Drawer
      expandedWidth='40%'
      expanded={ isExpanded }
      onChange={ onChangeHandler }
      sidebar={ (
        <ul>
          <li>link a</li>
          <li>link b</li>
          <li>link c</li>
        </ul>
      ) }
    >
      content body content body content body content body content body content body content body
    </Drawer>
  );
};

Controlled.story = {
  name: 'Controlled',
  parameters: {
    info: { disable: true },
    docs: {
      page: null
    }
  }
};
