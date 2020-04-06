import { numeralDateInputByPosition, numeralDateInput, numeralDateComponent } from '../../locators/numeralDate';
import { ERROR_TOOLTIP } from '../../locators/form/locators';

const BORDER_RED_COLOR = 'rgb(199, 56, 79)';
const FIRST_INPUT = 0;
const SECOND_INPUT = 1;
const THIRD_INPUT = 2;

Then('Number Date component has {int} separate inputs', (index) => {
  for (let i = 0; i < index; ++i) {
    numeralDateInputByPosition(i).should('be.visible');
  }
});

Then('All {int} Numeral Date inputs have red border', (index) => {
  for (let i = 0; i < index; ++i) {
    numeralDateInputByPosition(i).parent().should('have.css', 'background-color', 'rgb(255, 255, 255)')
      .and('have.css', 'border-bottom-color', BORDER_RED_COLOR)
      .and('have.css', 'border-left-color', BORDER_RED_COLOR)
      .and('have.css', 'border-right-color', BORDER_RED_COLOR)
      .and('have.css', 'border-top-color', BORDER_RED_COLOR);
    numeralDateInput().should('have.attr', 'aria-invalid', 'true');
  }
});

Then('error message for Numeral Date input is {string}', (text) => {
  numeralDateInputByPosition(2).parent().find(ERROR_TOOLTIP).should('have.attr', 'aria-label', text)
    .and('be.visible');
});

Then('error icon is visible in third input', () => {
  numeralDateComponent().find(ERROR_TOOLTIP).should('be.visible');
});

Then('I click on first input', () => {
  numeralDateInputByPosition(FIRST_INPUT).focus();
});

Then('I type numeral characters {string} in inputs', (text) => {
  numeralDateInputByPosition(FIRST_INPUT).clear().type(text);
  numeralDateInputByPosition(FIRST_INPUT).parent().should('have.css', 'outline-color', 'rgb(255, 181, 0)');
  numeralDateInputByPosition(SECOND_INPUT).clear().type(text);
  numeralDateInputByPosition(SECOND_INPUT).parent().should('have.css', 'outline-color', 'rgb(255, 181, 0)');
  numeralDateInputByPosition(THIRD_INPUT).clear().type(text);
  numeralDateInputByPosition(THIRD_INPUT).parent().should('have.css', 'outline-color', 'rgb(255, 181, 0)');
});

Then('I type no numeral characters {string} in inputs', (text) => {
  numeralDateInputByPosition(FIRST_INPUT).clear().type(text);
  numeralDateInputByPosition(SECOND_INPUT).clear().type(text);
  numeralDateInputByPosition(THIRD_INPUT).clear().type(text);
});

Then('inputs have value {string}', (text) => {
  numeralDateInputByPosition(FIRST_INPUT).should('have.value', text);
  numeralDateInputByPosition(SECOND_INPUT).should('have.value', text);
  numeralDateInputByPosition(THIRD_INPUT).should('have.value', text);
});
