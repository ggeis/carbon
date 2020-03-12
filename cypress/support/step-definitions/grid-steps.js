import { pod, gridPod } from '../../locators/grid';

Then('pod {int} is {string}', (index, title) => {
  pod(index).should('have.text', title);
});

When('I resize grid viewport to default', () => {
  cy.viewport(1958, 900);
});

When('I resize grid viewport to large', () => {
  cy.viewport(1500, 900);
});

When('I resize grid viewport to medium', () => {
  cy.viewport(1300, 900);
});

When('I resize grid viewport to small', () => {
  cy.viewport(900, 900);
});

Then('pod {int} has height from row {string} to row {string}', (index, rowStart, rowEnd) => {
  gridPod(index).should('have.css', 'grid-row-start', `${rowStart}`);
  gridPod(index).should('have.css', 'grid-row-end', `${rowEnd}`);
});

Then('pod {int} has width from column {int} to column {int}', (index, colStart, colEnd) => {
  gridPod(index).should('have.css', 'grid-column-start', `${colStart}`);
  gridPod(index).should('have.css', 'grid-column-end', `${colEnd}`);
});
