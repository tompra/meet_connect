import App from '../App';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
    test('Default number of events displayed', ({ given, when, then }) => {
        let AppComponent, AppDOM;
        given('user has not specified the number of events', () => {
            AppComponent = render(<App />);
        });

        when('user view the list of events', async () => {
            AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems =
                    within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems).toBeTruthy();
            });
        });

        then(/^(\d+) event should be displayed by default$/, async (arg0) => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems =
                    within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems).toHaveLength(32);
            });
        });
    });
    test('Changing the number of events displayed', ({ given, when, then }) => {
        let AppComponent, AppDOM;
        given('user is viewing a list of events', async () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems =
                    within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems).toBeTruthy();
            });
        });
        when(
            'user selects a different number of events to displayed',
            async () => {
                const user = userEvent.setup();
                const inputNumberEvents =
                    AppDOM.querySelector('#number-of-events');
                await user.type(inputNumberEvents, '{backspace}{backspace}10');
                expect(inputNumberEvents.value).toBe('10');
            }
        );

        then(
            'list of events should update to show the chosen number of events',
            () => {
                const EventListItems =
                    within(AppDOM).queryAllByRole('listitem');
                expect(EventListItems).toHaveLength(10);
            }
        );
    });
});
