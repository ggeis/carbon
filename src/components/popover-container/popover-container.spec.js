import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  PopoverContainerIcon,
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon
} from './popover-container.style';
import PopoverContainer from './popover-container.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';

describe('PopoverContainer', () => {
  jest.useFakeTimers();
  let wrapper;
  let preventDefault;

  beforeEach(() => {
    preventDefault = jest.fn();

    wrapper = mount(<PopoverContainer
      title='Popover Container Settings'
      iconType='settings'
    />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  it('should render correct', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should open the popover container on click', () => {
    act(() => {
      wrapper = mount(<PopoverContainer
        title='Popover Container Settings'
        iconType='settings'
      />);

      wrapper.find(PopoverContainerIcon).props().onClick();
    });

    wrapper.update();
    expect(wrapper.find(PopoverContainerContentStyle).exists()).toBe(true);
  });

  it.each([
    ['enter', 13, true],
    ['space', 32, true]
  ])('should open the popover container if %s clicked', (keyname, keycode, expected) => {
    act(() => {
      wrapper = mount(<PopoverContainer
        title='Popover Container Settings'
        iconType='settings'
      />);
      wrapper.find(PopoverContainerIcon).props().onKeyDown({ which: keycode, preventDefault });
    });

    wrapper.update();
    expect(preventDefault).toHaveBeenCalled();
    expect(wrapper.find(PopoverContainerContentStyle).exists()).toBe(expected);
  });

  it('should not open the popover container if different than Enter or Space key clicked', () => {
    act(() => {
      wrapper = mount(<PopoverContainer
        title='Popover Container Settings'
        iconType='settings'
      />);

      wrapper.find(PopoverContainerIcon).props().onKeyDown({ which: 27 /** 'escape' key */, preventDefault });
    });

    wrapper.update();
    expect(preventDefault).not.toHaveBeenCalled();
    expect(wrapper.find(PopoverContainerContentStyle).exists()).toBe(false);
  });

  it('should close the popover popover container if close Icon clicked', () => {
    act(() => {
      wrapper = mount(<PopoverContainer
        title='Popover Container Settings'
        iconType='settings'
      />);

      wrapper.find(PopoverContainerIcon).props().onClick();
    });

    wrapper.update();

    act(() => {
      wrapper.find(PopoverContainerCloseIcon).props().onClick();
      jest.runAllTimers();
    });

    wrapper.update();
    expect(wrapper.find(PopoverContainerContentStyle).exists()).toBe(false);
    jest.clearAllTimers();
  });

  it.each([
    ['enter', 13, false],
    ['space', 32, false]
  ])('should close the popover container if %s clicked', (keyname, keycode, expected) => {
    act(() => {
      wrapper = mount(<PopoverContainer
        title='Popover Container Settings'
        iconType='settings'
      />);

      wrapper.find(PopoverContainerIcon).props().onClick();
    });

    wrapper.update();

    act(() => {
      wrapper.find(PopoverContainerCloseIcon).props().onKeyDown({ which: keycode, preventDefault });
      jest.runAllTimers();
    });

    wrapper.update();

    expect(preventDefault).toHaveBeenCalled();
    expect(wrapper.find(PopoverContainerCloseIcon).exists()).toBe(expected);
    jest.clearAllTimers();
  });

  it('should not close the popover container if close Icon clicked', () => {
    act(() => {
      wrapper = mount(<PopoverContainer
        title='Popover Container Settings'
        iconType='settings'
      />);

      expect(wrapper.find(PopoverContainerContentStyle).exists()).toBe(false);
      wrapper.find(PopoverContainerIcon).props().onClick();
    });

    wrapper.update();

    act(() => {
      wrapper.find(PopoverContainerCloseIcon).props().onKeyDown({ which: 82 /** 'r' key */, preventDefault });
      jest.runAllTimers();
    });

    wrapper.update();
    expect(preventDefault).not.toHaveBeenCalled();
    expect(wrapper.find(PopoverContainerContentStyle).exists()).toBe(true);
    jest.clearAllTimers();
  });
});

describe('PopoverContainerContentStyle', () => {
  it('should render to the left if position is set to `left`', () => {
    const wrapper = mount(<PopoverContainerContentStyle position='left' />);
    assertStyleMatch({
      right: '0'
    }, wrapper);
  });

  it('should render to the right by default', () => {
    const wrapper = mount(<PopoverContainerContentStyle />);
    assertStyleMatch({
      left: '0'
    }, wrapper);
  });
});
