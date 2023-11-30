import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventList from '../EventList';
import Event from '../Event';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
    let EventListComponent, EventComponent, allEvents;
    beforeEach(async () => {
        allEvents = await getEvents();
        EventListComponent = render(<EventList />);
        EventComponent = render(<Event event={allEvents[0]} />);
    });
    test('Event element is collapsed by default.', ({ given, when, then }) => {
        given('user is viewing an list of events', async () => {
            EventListComponent = render(<EventList events={allEvents} />);
            const eventListItems = EventListComponent.getAllByRole('listitem');
            expect(eventListItems).toHaveLength(allEvents.length);
        });

        when("user doesn't click any event", () => {});

        then('event details should be collapsed initially', async () => {
            const eventItem = EventListComponent.getAllByRole('listitem')[0];
            const showDetailsBtn = within(eventItem).getByText('Show details');
            expect(showDetailsBtn).toBeInTheDocument();
        });
    });
    test('User can expand an event to see details.', ({
        given,
        when,
        then,
    }) => {
        given(
            'user is viewing an specific event with hidden details',
            async () => {
                const detailsBtn =
                    EventComponent.container.querySelector('.details-btn');
                expect(
                    EventComponent.queryByText('Show details')
                ).toBeInTheDocument();
                expect(detailsBtn.textContent).toContain('Show details');
            }
        );

        when(/^user click in "(.*)" to expand the event$/, async (arg0) => {
            const user = userEvent.setup();
            await user.click(EventComponent.getByText('Show details'));
        });

        then('event details should be displayed to the user', async () => {
            const detailsElement =
                EventComponent.container.querySelector('.details');

            await waitFor(() => {
                const hideDetails = EventComponent.getByText('Hide details');
                if (hideDetails) {
                    expect(detailsElement).toBeInTheDocument();
                }
            });
        });
    });
    test('User can collapse an event to see details.', ({
        given,
        when,
        then,
    }) => {
        given('user is viewing an specific event showing details', async () => {
            const user = userEvent.setup();
            await user.click(EventComponent.getByText('Show details'));
            const eventList =
                EventComponent.container.querySelector('.details');

            expect(eventList).not.toBeNull();
        });

        when(/^user clicks to "(.*)" to collapse the event$/, async (arg0) => {
            const user = userEvent.setup();
            await user.click(EventComponent.getByText('Hide details'));
            const hideDetails =
                EventComponent.container.querySelector('.details-btn');
            expect(hideDetails.textContent).toContain('Show details');
        });

        then('event details should be hidden from the user', () => {
            const showDetails =
                EventComponent.container.querySelector('.details');
            expect(showDetails).not.toBeInTheDocument();
        });
    });
});
