Feature: Show and hide events details
    Scenario: Event element is collapsed by default.
        Given user is viewing an list of events
        When user doesn't click any event
        Then event details should be collapsed initially
    
    Scenario: User can expand an event to see details.
        Given user is viewing an specific event with hidden details
        When user click in "Show details" to expand the event
        Then event details should be displayed to the user

    Scenario: User can collapse an event to see details.
        Given user is viewing an specific event showing details
        When user clicks to "Hide details" to collapse the event
        Then event details should be hidden from the user