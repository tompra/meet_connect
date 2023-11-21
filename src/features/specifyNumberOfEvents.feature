Feature: Specify number of events
    Scenario: Default number of events displayed
        Given user has not specified the number of events
        When user view the list of events
        Then 32 event should be displayed by default
    
    Scenario: Changing the number of events displayed
        Given user is viewing a list of events
        When user selects a different number of events to displayed
        Then list of events should update to show the chosen number of events
        