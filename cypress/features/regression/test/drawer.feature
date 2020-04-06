Feature: Drawer component
  I want to test Drawer component

  Background: Open Drawer component page
    Given I open basic Test "Drawer" component page

  @positive
  Scenario: Expanding Drawer
    When I click on Drawer arrow 1 time
    Then sidebar should have class open
      And toggle icon switched orientation to open
      And sidebar text is visible

  @positive
  Scenario: Collapsing Drawer
    When I click on Drawer arrow 2 times
    Then sidebar should have class closed
      And toggle icon switched orientation to closed
      And sidebar text is not visible
