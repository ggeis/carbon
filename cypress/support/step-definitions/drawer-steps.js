import {
  drawerToggle,
  drawerSidebar,
  drawerSidebarContent,
} from '../../locators/drawer';

When('I click on Drawer arrow', () => {
  drawerToggle().first().click();
});

Then('sidebar should have class {word}', (className) => {
  drawerSidebar().should('have.class', className);
});

Then('sidebar text is visible', () => {
  drawerSidebarContent().find('li:nth-child(1)').should('have.text', 'link a').and('be.visible');
});

Then('sidebar text is not visible', () => {
  drawerSidebarContent().find('li:nth-child(1)').should('have.text', 'link a').and('not.be.visible');
});

Then('toggle icon switched orientation to open', () => {
  drawerToggle().should('have.css', 'transform', 'matrix(-1, 0, 0, 1, 0, 0)');
});

Then('toggle icon switched orientation to closed', () => {
  drawerToggle().should('have.css', 'transform', 'none');
});
