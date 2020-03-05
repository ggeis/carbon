import React from 'react';
import { mount, shallow } from 'enzyme';
// import { act } from 'react-dom/test-utils';
// import { Input } from '../input';
import NumeralDate from './numeral-date.component';
import { StyledDateField } from './numeral-date.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
// import StyledTextInput from '../input/input-presentation.style';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';

describe('NumeralDate', () => {
  let wrapper, onBlur, onChange, onKeyDown;

  const renderWrapper = (props, render = shallow) => (
    render(
      <NumeralDate
        { ...props }
      />
    )
  );
  describe('styles', () => {
    it('matches the expected styles', () => {
      assertStyleMatch({
        display: 'inline-flex',
        fontSize: '14px',
        fontWeight: '400'
      }, renderWrapper({ dateFormat: ['dd', 'mm', 'yyyy'] }, mount));
    });

    it('matches the expected styles when the input is focused', () => {
      wrapper = renderWrapper({ dateFormat: ['dd'] }, mount);
      const input = wrapper.find('input');
      input.simulate('focus');
      assertStyleMatch({

      }, wrapper);
    });

    it('matches the expected styles when the input is active', () => {
      wrapper = renderWrapper({ dateFormat: ['dd', 'mm', 'yyyy'] }, mount);
      assertStyleMatch({

      }, wrapper);
    });

    it('applies the expected styling to the input', () => {
      wrapper = renderWrapper({ dateFormat: ['dd', 'mm', 'yyyy'] }, mount);
      assertStyleMatch({
        width: '375px',
        fontSize: '14px',
        fontWeight: '700'
      }, wrapper, { modifier: `${StyledDateField}` });
    });
  });

  describe('Clicking off the component', () => {
    it('calls onBlur', () => {
      onBlur = jest.fn();
      wrapper = renderWrapper({ dateFormat: ['dd', 'mm', 'yyyy'], onBlur }, mount);
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
        dateFormat: ['dd', 'mm', 'yyyy'], onBlur, onChange, onKeyDown, id: 'Search', name: 'Search'
      }, mount);
    });

    it('accepts a value and calls onChange prop', () => {
      const input = wrapper.find('input');
      input.simulate('change', { target: { value: '12' } });
      expect(input.props().value).toEqual('12');
      expect(onChange).toHaveBeenCalled();
    });

    it('passes other event handlers down to the input', () => {
      const keyDownParams = { target: { selectionStart: 1, selectionEnd: 2 } };
      const input = wrapper.find('input');
      input.simulate('keydown', { keyDownParams });
      expect(onKeyDown).toHaveBeenCalled();
    });
  });

  describe('Clicking off the component', () => {
    it('calls onBlur', () => {
      const input = wrapper.find('input');
      input.simulate('blur');
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('Prop Types', () => {
    it('validates children prop types', () => {
      jest.spyOn(global.console, 'error').mockImplementation(() => {});
      mount(
        <NumeralDate value='' dateFormat={ ['dd', 'mm', 'yyyy', 'mmmm'] } />
      );
      expect(console.error).toHaveBeenCalledWith(
        'Warning: Failed prop type: dateFormat array be no greater than three.\n    in NumeralDate'
      );
      global.console.error.mockReset();
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapperWithTags = shallow(<NumeralDate value='' />);
      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapperWithTags, 'search');
      });
    });
  });
});
