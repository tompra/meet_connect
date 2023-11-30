/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-node-access */
import { render } from '@testing-library/react';
import { getEvents } from '../api';
import EventList from '../EventList';

describe('<EventList /> component', () => {
    let EventListComponent;

    beforeEach(() => {
        EventListComponent = render(<EventList />);
    });

    test('has an element with "list" role', () => {
        expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
    });

    test('renders correct numbers of events', async () => {
        const allEvents = await getEvents();
        const first32Events = allEvents.slice(0, 32);
        EventListComponent.rerender(<EventList events={first32Events} />);
        const eventListItems = EventListComponent.queryAllByRole('listitem');
        expect(eventListItems).toHaveLength(32);
    });
});

// Integration test
describe('<EventList /> integration', () => {
    test('renders a list of 32 events when the app is mounted and rendered', async () => {
        const allEvents = await getEvents();
        const first32Events = allEvents.slice(0, 32);
        const EventListComponent = render(<EventList events={first32Events} />);
        const EventListItems = EventListComponent.getAllByRole('listitem');
        expect(EventListItems).toHaveLength(32);
    });
});
