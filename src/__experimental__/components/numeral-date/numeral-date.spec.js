import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { act } from 'react-dom/test-utils';
import mintTheme from '../../../style/themes/mint';
import NumeralDate from './numeral-date.component';
import StyledNumeralDate from './numeral-date.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import StyledTextInput from '../input/input-presentation.style';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';

describe('NumeralDate', () => {
  let wrapper, onBlur, onChange, onKeyDown;

  const renderWrapper = (props, render = shallow) => {
    const defaultProps = { value: '12', dateFormat: ['dd', 'mm', 'yyyy'] };
    return (
      render(
        <ThemeProvider theme={ mintTheme }>
          <NumeralDate
            { ...defaultProps }
            { ...props }
          />
        </ThemeProvider>
      )
    );
  };

  describe('styles', () => {
    it('matches the expected styles', () => {
      assertStyleMatch({
        display: 'inline-flex',
        fontSize: '14px',
        fontWeight: '400'
      }, renderWrapper({ }, mount));
    });

    it('matches the expected styles when the input is focused', () => {
      wrapper = renderWrapper({ value: '12', dateFormat: ['dd'] }, mount);
      const input = wrapper.find('input');
      input.simulate('focus');
      assertStyleMatch({
      }, wrapper, { modifer: `${StyledTextInput}` });
    });

    it('applies the expected styling when component has an error', () => {
      wrapper = renderWrapper({ value: '23', dateFormat: ['dd'], errorPresent: true }, mount);
      assertStyleMatch({
        fontSize: '14px',
        fontWeight: '400'
      }, wrapper);
    });
  });

  describe('Clicking off the component', () => {
    it('calls onBlur', () => {
      onBlur = jest.fn();
      wrapper = renderWrapper({ dateFormat: ['dd'], onBlur }, mount);
      const input = wrapper.find('input');
      input.simulate('blur');
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('supports being a controlled component', () => {
    beforeEach(() => {
      onKeyDown = jest.fn();
      onChange = jest.fn();
      onBlur = jest.fn();
      wrapper = renderWrapper({
        dateFormat: ['dd'],
        onBlur,
        onChange,
        onKeyDown,
        id: 'numeralDate_id',
        name: 'numeralDate_name'
      }, mount);
    });

    it('accepts a value and calls onChange prop', () => {
      const input = wrapper.find('input');
      act(() => {
        input.simulate('change', { target: { value: '45' } });
      });
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Component does not allow non-numeric characters to be entered', () => {
    beforeEach(() => {
      onKeyDown = jest.fn();
      onChange = jest.fn();
      onBlur = jest.fn();
      wrapper = renderWrapper({
        dateFormat: ['dd'],
        onBlur,
        onChange,
        onKeyDown,
        id: 'numeralDate_id',
        name: 'numeralDate_name'
      }, mount);
    });
    afterEach(() => jest.clearAllMocks());
    it.each([['a', 65], ['/', 191]])('does not allow input', (key) => {
      const input = wrapper.find('input');
      const event = { key: key[0], which: key[1], preventDefault: jest.fn() };
      act(() => {
        input.simulate('keypress', event);
      });
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('Valid characters', () => {
    beforeEach(() => {
      onKeyDown = jest.fn();
      onChange = jest.fn();
      onBlur = jest.fn();
      wrapper = renderWrapper({
        dateFormat: ['dd'],
        onBlur,
        onChange,
        onKeyDown,
        id: 'numeralDate_id',
        name: 'numeralDate_name'
      }, mount);
    });
    it('allows numeric key presses', () => {
      const input = wrapper.find('input');
      const event = { key: '1', which: 49, preventDefault: jest.fn() };
      act(() => {
        input.simulate('keypress', event);
      });
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapperWithTags = shallow(<NumeralDate dateFormat={ ['dd', 'mm', 'yyyy'] } value='13' />);
      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapperWithTags.find(StyledNumeralDate), 'numeral-date');
      });
    });
  });
});
