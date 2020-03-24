import {
  DRAWER,
  DRAWER_TOGGLE,
  DRAWER_SIDEBAR,
  DRAWER_SIDEBAR_CONTENT,
} from './locators';

// component preview locators
export const drawerToggle = () => cy.iFrame(DRAWER_TOGGLE);
export const drawerSidebar = () => cy.iFrame(DRAWER_SIDEBAR);
export const drawerSidebarContent = () => cy.iFrame(DRAWER_SIDEBAR_CONTENT);
