# MeetConnect

## Project description

Build a serverless, progressive web application (PWA) with React using a test-driven development technique.
Merging serverles computing and PWAs paves the way for modern web development with perks like:

-   Serverless: No backend maintenance, easy to scale, always available, no cost for idle time.
-   PWAs: Instant loading, offline support, push notifications, "add to home screen" prompt, responsive design, and cross-platform compability.

## How to get the project running

1. Create directory in your local computer
   `mk dir <name_your_directory>`
2. Clone the GitHub repository using the command:
   `git clone <repository-url>`
3. Navigate to the project directory:
   `cd <project-directory>`
4. Install dependencies
   `npm install`
5. Run the project:
   `npm run start`

## Project dependecies

-   React
-   Jest

## API

-   Google Calendar

## Key features

-   Filter Events by City.
-   Show/Hide Event Details.
-   Specify Number of Events.
-   Use the App When Offline.
-   Add an App Shortcut to the Home Screen.
-   Display Charts Visualizing Event Details.

## User stories and scenarios

### Feature: Filter events by city.

#### User story

As a user, I want to filter events by my preferred city, allowing me to find events in the city of my choice easily.

#### Scenario 1: When the user hasn’t searched for a city, show upcoming events from all cities.

**Given** the user hasn’t searched for any city.
**When** the user hasn’t entered any specific city in the searched or filter field.
**Then** the app should display a list of upcoming events from all cities.

#### Scenario 2: User should see a list of suggestions when they search for a city

**Given** the user is using the event app and landed on the home page.
**When** the user typing in the search field to search for a city.
**Then** the app should display a list of suggested cities as the user types.

#### Scenario 3: Selecting a city from suggested list

**Given** the user searched for a specific city.
**When** the user sees a list of suggested cities after typing in the search field and the user selects a city from the suggested list.
**Then** the app should use the selected city for display events for the chosen city.

### Feature: Show/Hide Event Details.

#### User story

As a user, I want the ability to toggle event details on or off, giving me control over the information displayed for a chosen event.

#### Scenario 1: Event element is collapsed by default.

**Given** the user is viewing an a list of events.
**When** the user doesn’t click any event.
**Then** the event details should be collapsed initially.

#### Scenario 2: User can expand an event to see details.

**Given** the user is viewing an specific event with hidden details.
**When** the user click in “Show details” to expand the event.
**Then** the event details should be displayed to the user.

#### Scenario 3: User can collapse an event to hide details.

**Given** the user is viewing an specific event showing details.
**When** the user clicks to “Hide details” to collapse the event.
**Then** the event details should be hidden from the user.

### Feature: Specify Number of Events.

#### User story

As a user, I want to view the total number of events in a searched city, providing me with precise event count information.

#### Scenario 1: Default number of events displayed.

**Given** the user has not specified the number of events
**When** the user view the list of events
**Then** 32 events should be displayed by default

#### Scenario 2: Changing the number of events displayed.

**Given** the user is viewing a list of events
**When** the user selects a different number of events to display
**Then** the list of events should update to show the chosen number of events

### Feature: Use the App When Offline.

#### User story

As a user, I want the app to be accessible offline, ensuring that I can access event details even without connection.

#### Scenario 1: Display data when no internet connection.

**Given** the user has previously viewed event data and has no internet connection
**When** the user opens the app without an internet connection
**Then** the app should displayed the previous data to the user

#### Scenario 2: Display error when user changes search setting while offline.

**Given** the user has no internet connection and is using the app
**When** the user attempts to change search setting (city or number of events)
**Then** the app should display an error message to inform the user that an internet connection is required for this action.

### Feature: Add an App Shortcut to the Home Screen.

#### User story

As a user, I want to create a home screen shortcut for the app, making it convenient to access the app quickly.

#### Scenario: Installing meet app shortcut on home screen

**Given** the user is using the meet app on their device
**When** the user accesses the app settings or options and the user chooses to add the app to the home screen.
**Then** the app should be added as a shortcut on the user’s device home screen.

### Feature: Display Charts Visualizing Event Details.

#### User story

As a user, I want visual charts to represent event data, helping me understand event distribution across different cities.

#### Scenario: Display chart showing upcoming events in each city.

**Given** the user opened an specific event.
**When** the user navigates to the event details or statistics section
**Then** the app should display a chart representing the number of upcoming events in each city.


### Why Serverless functionality?

The app will use serverless functions for handling the authorization for accessing events from the Google Calendar API. User when logs in and grants consent the Auth is granted. This authorization is granted by serverless functions, which is a way of allowing us to build and maintain a server focusing on the business logic and application functionality. 
In this case, serverless functionality will create the client-id and token-id through the Google OAuth by secure access to the Google Calendar API. The chosen cloud-service for implementing the serverless functions will be AWS Lambda.
