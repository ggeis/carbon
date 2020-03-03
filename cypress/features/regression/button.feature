Feature: Button component
  I want to check Button component properties

  Background: Open Button component default page
    Given I open "Button" component page

  @positive @applitools
  Scenario Outline: Set Button size to <size>
    When I select size to "<size>"
    Then Button height is "<height>" and width is "<width>"
    Then Element displays correctly
    Examples:
      | size   | height | width     |
      | small  | 32     | 136.4375  |
      | medium | 40     | 152.4375  |
      | large  | 48     | 182.78125 |

  @positive @applitools
  Scenario Outline: Set Button subtext to <subtext>
    Given I select size to "large"
    When I set subtext to "<subtext>"
    Then Button subtext on preview is "<subtext>"
    Then Element displays correctly
    Examples:
      | subtext                 |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive @applitools
  Scenario Outline: Set Button Type as <buttonType>
    When I select buttonType to "<buttonType>"
    Then Button font color is "<font-color>"
      And Button background color is "<background-color>"
    Then Element displays correctly
    Examples:
      | buttonType     | font-color         | background-color   |
      | primary        | rgb(255, 255, 255) | rgb(0, 128, 93)    |
      | secondary      | rgb(0, 128, 93)    | rgba(0, 0, 0, 0)   |
      | tertiary       | rgb(0, 128, 93)    | rgba(0, 0, 0, 0)   |
      | destructive    | rgb(255, 255, 255) | rgb(199, 56, 79)   |
      | darkBackground | rgb(0, 128, 93)    | rgb(255, 255, 255) |

  @positive @applitools
  Scenario Outline: Set Button component label to <label>
    When I set children to "<label>"
    Then Button label on preview is "<label>"
    Then Element displays correctly
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive @applitools
  Scenario: Disable Button
    When I disable Button component
    Then Button is disabled
    Then Element displays correctly

  @positive @applitools
  Scenario: Disable and enable Button
    Given I disable Button component
    When I enable Button component
    Then Button is enabled
    Then Element displays correctly

  @positive @applitools
  Scenario Outline: Change Button icon position to <iconPosition>
    Given I check has icon checkbox
    When I select iconType to "add"
      And I select iconPosition to "<iconPosition>"
    Then Button icon position is set to "<iconPosition>"
    Then Element displays correctly
    Examples:
      | iconPosition |
      | after        |
      | before       |

  @positive @applitools
  Scenario: Verify the click function for a Button component
    Given clear all actions in Actions Tab
    When I click on "button"
    Then click action was called in Actions Tab
    Then Element displays correctly
