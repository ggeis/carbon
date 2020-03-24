Feature: Drawer component
  I want to test Drawer component

  Background: Open Drawer component page
    Given I open basic Test "Drawer" component page

  @positive
  Scenario: Expanding Drawer
    Given I click on Drawer arrow
    Then sidebar should have class open
      And toggle icon switched orientation to open
      And sidebar text is visible

  @positive
  Scenario: Collapsing Drawer
    Given I click on Drawer arrow
      And I click on Drawer arrow
    Then sidebar should have class closed
      And toggle icon switched orientation to closed
      And sidebar text is not visible
