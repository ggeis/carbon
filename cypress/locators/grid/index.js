import { POD, ROOT } from './locators';

export const pod = index => cy.get(POD).eq(index);
export const gridPod = index => cy.get(ROOT)
  .find('div')
  .find(`div:nth-child(${index})`);
