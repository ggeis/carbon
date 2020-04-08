import React, {
  useState, useRef, useEffect, useCallback
} from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

import ElementResize from '../../utils/helpers/element-resize';
import OptionsHelper from '../../utils/helpers/options-helper';
import FormSummary from './form-summary.component';
import {
  StyledForm,
  StyledFormFooter,
  StyledLeftButtons,
  StyledRightButtons,
  StyledSaveContainer
} from './form.style';

const SCROLL_THROTTLE = 100;

const Form = ({
  children,
  saveButton,
  leftSideButtons,
  rightSideButtons,
  errorCount,
  warningCount,
  onSubmit,
  buttonAlignment,
  stickyFooter,
  showSummary,
  ...rest
}) => {
  const [isFooterSticky, setIsFooterSticky] = useState(false);

  const formRef = useRef();

  const formFooterRef = useRef();

  const stickyListenersAddedRef = useRef(false);

  const checkStickyFooter = useCallback(throttle(() => {
    const formHeight = (formRef.current.offsetTop + formRef.current.offsetHeight) - window.pageYOffset;
    const footerHeight = formFooterRef.current.offsetHeight;

    if (formHeight - (footerHeight / 2) > window.innerHeight) {
      setIsFooterSticky(true);
    } else if (formHeight < window.innerHeight) {
      setIsFooterSticky(false);
    }
  }, SCROLL_THROTTLE), []);

  const addStickyFooterListeners = useCallback(() => {
    ElementResize.addListener(formRef.current, checkStickyFooter);
    window.addEventListener('resize', checkStickyFooter, true);
    window.addEventListener('scroll', checkStickyFooter, true);
  }, [checkStickyFooter]);

  const removeStickyFooterListeners = useCallback(() => {
    ElementResize.removeListener(formRef.current, checkStickyFooter);
    window.removeEventListener('resize', checkStickyFooter, true);
    window.removeEventListener('scroll', checkStickyFooter, true);
  }, [checkStickyFooter]);

  useEffect(() => {
    if (stickyFooter && !stickyListenersAddedRef.current) {
      addStickyFooterListeners();
      checkStickyFooter();
      stickyListenersAddedRef.current = true;
    }
    return () => removeStickyFooterListeners();
  }, [addStickyFooterListeners, checkStickyFooter, removeStickyFooterListeners, stickyFooter]);

  const saveButtonWithSummary = () => {
    const save = (
      <StyledSaveContainer>
        { saveButton }
      </StyledSaveContainer>
    );
    if (showSummary) {
      return <FormSummary errors={ errorCount } warnings={ warningCount }>{save}</FormSummary>;
    }
    return save;
  };

  const formButtons = () => {
    const buttons = <>
      {leftSideButtons && (
        <StyledLeftButtons buttonAlignment={ buttonAlignment }>
          { leftSideButtons }
        </StyledLeftButtons>
      )}
      {saveButtonWithSummary()}
      {rightSideButtons && (
        <StyledRightButtons buttonAlignment={ buttonAlignment }>
          { rightSideButtons }
        </StyledRightButtons>
      )}
    </>;
    return buttons;
  };

  return (
    <StyledForm
      ref={ formRef }
      stickyFooter={ stickyFooter && isFooterSticky }
      onSubmit={ onSubmit }
      data-component='form'
      { ...rest }
    >
      { children }
      <StyledFormFooter
        data-element='form-footer'
        className={ isFooterSticky ? 'isSticky' : '' }
        ref={ formFooterRef }
        stickyFooter={ isFooterSticky }
        buttonAlignment={ buttonAlignment }
      >
        { formButtons() }
      </StyledFormFooter>
    </StyledForm>
  );
};

Form.propTypes = {
  /** Alignment of buttons */
  buttonAlignment: PropTypes.oneOf(OptionsHelper.alignBinary),

  /** Enables the sticky footer. */
  stickyFooter: PropTypes.bool,

  /** Additional buttons rendered on the left side of the save button */
  leftSideButtons: PropTypes.node,

  /** Additional buttons rendered on the right side of the save button */
  rightSideButtons: PropTypes.node,

  /** Callback passed to the form element */
  onSubmit: PropTypes.func,

  /** Child elements */
  children: PropTypes.node,

  /** Hide or show the summary */
  showSummary: PropTypes.bool,

  /** Save button to be rendered */
  saveButton: PropTypes.node,

  /** The total number of errors present in the form */
  errorCount: PropTypes.number,

  /** The total number of warnings present in the form */
  warningCount: PropTypes.number
};

Form.defaultProps = {
  buttonAlignment: 'right',
  showSummary: true
};

export default Form;
