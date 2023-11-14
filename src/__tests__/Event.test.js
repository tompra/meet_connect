import Event from '../Event';
import { getEvents } from '../api';
import { render } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event';

describe('<Event /> component', () => {
    let EventComponent;
    let allEvents;

    beforeEach(async () => {
        allEvents = await getEvents();
        EventComponent = render(<Event event={allEvents[0]} />);
    });
    //Event element has event's title
    test('renders event title', () => {
        expect(
            EventComponent.queryByText(allEvents[0].summary)
        ).toBeInTheDocument();
    });
    //Event element has event's start time
    test('renders event start time', () => {
        expect(
            EventComponent.queryByText(allEvents[0].created)
        ).toBeInTheDocument();
    });
    //Event element has event's location
    test('renders event location', () => {
        expect(
            EventComponent.queryByText(allEvents[0].location)
        ).toBeInTheDocument();
    });

    // // Event element is collapsed by default
    // test('by default the event is collapsed', () => {});
    // // User can expand an event to see details
    // test('show the details section when the user clicks on the "show details" button', () => {});
    // // User can collapse an event to hide details
    // test('hide the details section when the user clicks on the "hide details" button', () => {});
});
