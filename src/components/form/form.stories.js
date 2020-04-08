import React, { useState } from 'react';
import {
  select, boolean, number, text
} from '@storybook/addon-knobs';

import { dlsThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import Form from './form.component';
import Textbox from '../../__experimental__/components/textbox';
import Button from '../button';
import DialogFullScreen from '../dialog-full-screen';
import Dialog from '../dialog';

export default {
  title: 'Test/Form',
  component: Form,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true
    },
    knobs: { escapeHTML: false }
  }
};

export const Basic = () => {
  const { defaultProps } = Form;

  const buttonAlignment = select(
    'buttonAlignment',
    OptionsHelper.alignBinary,
    defaultProps.buttonAlignment
  );

  const showSummary = boolean('showSummary', defaultProps.showSummary);
  const stickyFooter = boolean('stickyFooter', false);
  const errorCount = number('errorCount', 0);
  const warningCount = number('warningCount', 0);
  const inputCount = number('number of rendered textboxes', 10);

  return (
    <>
      <Form
        leftSideButtons={
          <Button onClick={ () => console.log('cancel') }>Cancel</Button>
        }
        rightSideButtons={
          <Button onClick={ () => console.log('cancel') }>Clear</Button>
        }
        saveButton={ <Button buttonType='primary' onClick={ () => console.log('save') }>Submit</Button> }
        errorCount={ errorCount }
        warningCount={ warningCount }
        buttonAlignment={ buttonAlignment }
        showSummary={ showSummary }
        stickyFooter={ stickyFooter }
      >
        {Array.from({ length: inputCount }).map((_, index) => <Textbox key={ index } label='Textbox' />)}
      </Form>
    </>
  );
};

export const InDialogFullScreen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { defaultProps } = Form;

  const buttonAlignment = select(
    'buttonAlignment',
    OptionsHelper.alignBinary,
    defaultProps.buttonAlignment
  );

  const showSummary = boolean('showSummary', defaultProps.showSummary);
  const stickyFooter = boolean('stickyFooter', false);
  const errorCount = number('errorCount', 0);
  const warningCount = number('warningCount', 0);
  const inputCount = number('number of rendered textboxes', 10);
  return (
    <>
      <Button onClick={ () => setIsOpen(true) }>Open Preview</Button>
      <DialogFullScreen
        open={ isOpen }
        onCancel={ () => setIsOpen(false) }
        title='Form in Dialog Full Screen'
        subtitle='Subtitle'
      >
        <Form
          leftSideButtons={
            <Button onClick={ () => console.log('cancel') }>Cancel</Button>
          }
          rightSideButtons={
            <Button onClick={ () => console.log('cancel') }>Clear</Button>
          }
          saveButton={ <Button buttonType='primary' onClick={ () => console.log('save') }>Submit</Button> }
          errorCount={ errorCount }
          warningCount={ warningCount }
          buttonAlignment={ buttonAlignment }
          showSummary={ showSummary }
          stickyFooter={ stickyFooter }
        >
          {Array.from({ length: inputCount }).map((_, index) => <Textbox key={ index } label='Textbox' />)}
        </Form>
      </DialogFullScreen>
    </>
  );
};

export const InDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { defaultProps } = Form;

  const buttonAlignment = select(
    'buttonAlignment',
    OptionsHelper.alignBinary,
    defaultProps.buttonAlignment
  );

  const dialogHeight = text('dialog height', '500');

  const showSummary = boolean('showSummary', defaultProps.showSummary);
  const stickyFooter = boolean('stickyFooter', false);
  const errorCount = number('errorCount', 0);
  const warningCount = number('warningCount', 0);
  const inputCount = number('number of rendered textboxes', 10);

  return (
    <>
      <Button onClick={ () => setIsOpen(true) }>Open Preview</Button>
      <Dialog
        open={ isOpen }
        onCancel={ () => setIsOpen(false) }
        title='Form in Dialog'
        subtitle='Subtitle'
        height={ dialogHeight }
      >
        <Form
          leftSideButtons={
            <Button onClick={ () => console.log('cancel') }>Cancel</Button>
          }
          rightSideButtons={
            <Button onClick={ () => console.log('cancel') }>Clear</Button>
          }
          saveButton={ <Button buttonType='primary' onClick={ () => console.log('save') }>Submit</Button> }
          errorCount={ errorCount }
          warningCount={ warningCount }
          buttonAlignment={ buttonAlignment }
          showSummary={ showSummary }
          stickyFooter={ stickyFooter }
        >
          {Array.from({ length: inputCount }).map((_, index) => <Textbox key={ index } label='Textbox' />)}
        </Form>
      </Dialog>
    </>
  );
};
