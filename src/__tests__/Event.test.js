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

    //Default behaviour details are collapsed
    test('default behaviour details are collapsed', () => {
        expect(EventComponent.queryByText('Show details')).toBeInTheDocument();
        expect(EventComponent.queryByText('Hide details')).toBeNull();
    });

    //Show details when user clicks button 'show details'

    //Hide details when user clicks button 'hide details'
});
