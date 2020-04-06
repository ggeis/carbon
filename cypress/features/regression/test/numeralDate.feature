Feature: Numeral Date component
  I want to test Numeral Date component properties

  Background: Open Numeral Date component page
    Given I open basic Test "Numeral Date" component page

  @positive
  Scenario: Number Date component has three separate inputs
    # commented because of BDD default scenario Given - When - Then
    # When I open basic Test "Numeral Date" component page
    Then Number Date component has 3 separate inputs

  @positive
  Scenario: Verify that all Numeral Date input have error border color
    When I check errorPresent checkbox
    Then All 3 Numeral Date inputs have red border

  @positive
  Scenario: Verify the third Numeral Date input has error icon
    When I check errorPresent checkbox
    Then error icon is visible in third input

  @positive
  Scenario Outline: Verify the error message after hover on error icon
    Given I check errorPresent checkbox
      And I set errorMessage to "<errorMessage>"
    When I hover mouse onto "error" icon in iFrame
    Then error message for Numeral Date input is "<errorMessage>"
    Examples:
      | errorMessage            |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |

  @positive
  Scenario: Type numeral character in the Numera Date inputs
    Given I click on first input
    When I type numeral characters "123" in inputs
    Then inputs have value "123"

  @positive
  Scenario: Verify that Numeral Date input doesn't allow type numeral character in inputs
    Given I click on first input
    When I type no numeral characters "date" in inputs
    Then inputs have value ""