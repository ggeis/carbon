import {
  DRAWER,
  DRAWER_TOGGLE,
} from './locators';

// component preview locators
export const drawerToggle = () => cy.iFrame(DRAWER_TOGGLE);
export const drawerSidebar = () => cy.iFrame(DRAWER).find('div:nth-child(1)');
export const drawerSidebarContent = () => drawerSidebar().find('div');
