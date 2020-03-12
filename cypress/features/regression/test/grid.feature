Feature: Grid component
  I want to check Grid component properties

  Background: Open Grid component page
    Given I open "Test Grid" component page full in iframe

  @positive
  Scenario Outline: Check Grid has "<title>"
    # commented because of BDD default scenario Given - When - Then
    # When I open "Grid" component page
    Then pod <index> is "<title>"
    Examples:
      | index | title       |
      | 0     | GridItem 1. |
      | 1     | GridItem 2. |
      | 2     | GridItem 3. |

  @positive
  Scenario Outline: Set viewport to default and check size of "<podTitle>"
    When I resize grid viewport to default
    Then pod <index> has height from row "<rowStart>" to row "<rowEnd>"
      And pod <index> has width from column <colStart> to column <colEnd>
    Examples:
      | index    | podTitle    | rowStart | rowEnd | colStart | colEnd |
      | 1        | GridItem 1. | auto     | auto   | 1        | 13     |
      | 2        | GridItem 2. | auto     | auto   | 1        | 13     |
      | 3        | GridItem 3. | auto     | auto   | 1        | 13     |
  
  @positive
  Scenario Outline: Set viewport to large and check size of "<podTitle>"
    When I resize grid viewport to large
    Then pod <index> has height from row "<rowStart>" to row "<rowEnd>"
      And pod <index> has width from column <colStart> to column <colEnd>
    Examples:
      | index | podTitle    | rowStart | rowEnd | colStart | colEnd |
      | 1     | GridItem 1. | 1        | 1      | 1        | 7      |
      | 2     | GridItem 2. | 1        | 1      | 7        | 13     |
      | 3     | GridItem 3. | 2        | 2      | 1        | 13     |

  @positive
  Scenario Outline: Set viewport to medium and check size of "<podTitle>"
    When I resize grid viewport to medium
    Then pod <index> has height from row "<rowStart>" to row "<rowEnd>"
      And pod <index> has width from column <colStart> to column <colEnd>
    Examples:
      | index | podTitle    | rowStart | rowEnd | colStart | colEnd |
      | 1     | GridItem 1. | 1        | 1      | 1        | 13     |
      | 2     | GridItem 2. | 2        | 2      | 1        | 13     |
      | 3     | GridItem 3. | 3        | 3      | 1        | 13     |
    
  @positive
  Scenario Outline: Set viewport to small and check size of "<podTitle>"
    When I resize grid viewport to small
    Then pod <index> has height from row "<rowStart>" to row "<rowEnd>"
      And pod <index> has width from column <colStart> to column <colEnd>
    Examples:
      | index | podTitle    | rowStart | rowEnd | colStart | colEnd |
      | 1     | GridItem 1. | 2        | 2      | 1        | 9      |
      | 2     | GridItem 2. | 3        | 3      | 1        | 9      |
      | 3     | GridItem 2. | 1        | 1      | 1        | 9      |
