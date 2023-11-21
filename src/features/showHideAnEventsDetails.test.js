import App from '../App';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
    test('Event element is collapsed by default.', ({ given, when, then }) => {
        let AppComponent, AppDOM;
        given('user is viewing an list of events', async () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems =
                    within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });

        when("user doesn't click any event", () => {});

        then('event details should be collapsed initially', async () => {
            const EventListItem = AppDOM.querySelector('.card');
            const ShowDetails = AppDOM.querySelector('.details');
            expect(
                within(EventListItem).getByText('Show details')
            ).toBeInTheDocument();
            expect(ShowDetails).not.toBeInTheDocument();
        });
    });
    test('User can expand an event to see details.', ({
        given,
        when,
        then,
    }) => {
        let AppComponent, AppDOM;
        given(
            'user is viewing an specific event with hidden details',
            async () => {
                AppComponent = render(<App />);
                AppDOM = AppComponent.container.firstChild;
                await waitFor(() => {
                    const EventListDOM = AppDOM.querySelector('#event-list');
                    const firstEventListItem =
                        within(EventListDOM).getAllByRole('listitem')[0];
                    const showDetailsBtn =
                        within(firstEventListItem).getByText('Show details');
                    expect(showDetailsBtn).toBeInTheDocument();
                });
            }
        );

        when(/^user click in "(.*)" to expand the event$/, async (arg0) => {
            const detailBtn = AppDOM.querySelector('.details-btn');
            const user = userEvent.setup();
            await user.click(detailBtn);
            expect(detailBtn.textContent).toContain('Hide details');
        });

        then('event details should be displayed to the user', () => {
            const showDetails = AppDOM.querySelector('.details');
            expect(showDetails).not.toBeNull();
        });
    });
    test('User can collapse an event to see details.', ({
        given,
        when,
        then,
    }) => {
        let AppComponent, AppDOM;
        given('user is viewing an specific event showing details', async () => {
            let showDetailsBtn;
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            const user = userEvent.setup();
            await waitFor(() => {
                const firstEventListItem =
                    within(EventListDOM).getAllByRole('listitem')[0];
                showDetailsBtn =
                    within(firstEventListItem).getByText('Show details');
            });
            await user.click(showDetailsBtn);
            const showDetails = AppDOM.querySelector('.details');
            expect(showDetails).not.toBeNull();
        });

        when(/^user clicks to "(.*)" to collapse the event$/, async (arg0) => {
            const hideDetailsBtn = AppDOM.querySelector('.details-btn');
            const user = userEvent.setup();
            await user.click(hideDetailsBtn);
            expect(hideDetailsBtn.textContent).toContain('Show details');
        });

        then('event details should be hidden from the user', () => {
            const showDetails = AppDOM.querySelector('.details');
            expect(showDetails).not.toBeInTheDocument();
        });
    });
});
