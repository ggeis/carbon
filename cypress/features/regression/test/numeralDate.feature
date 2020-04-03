Feature: Numeral Date component
  I want to test FlatTable component properties

  Background: Open Numeral Date component page
    Given I open basic Test "Numeral Date" component page
    # Given I open basic Test "Numeral Date" component page in noIframe

  @positive
  Scenario: Number Date component has three separate inputs
    # commented because of BDD default scenario Given - When - Then
    # When I open basic Test "Numeral Date" component page
    Then Number Date component has 3 separate inputs

  @positive
  Scenario: Verify that all Numeral Date input show error border color
    When I check errorPresent checkbox
    Then All 3 Numeral Date inputs have red border

  @positive
  Scenario: Verify the third Numeral Date input has error icon
    When I check errorPresent checkbox
    Then error icon is visible in third input

  @positive
  Scenario: Verify the error message after hover on error icon
    Given I check errorPresent checkbox
    When I hover mouse onto "error" icon in iFrame
    Then error message for Numeral Date input is "Invalid format (DD/MM/YYYY)"

  @positive
  Scenario Outline: Move between inputs using Tab key
    Given I click on first input
    When I press Tab on focused element
    Then <index> Numeral Date input has golden border
    Examples:
      | index |
      | 1     |