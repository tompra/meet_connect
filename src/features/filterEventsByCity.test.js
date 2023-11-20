import App from '../App';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import { getEvents } from '../api';
import userEvent, { UserEvent } from '@testing-library/user-event';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, (test) => {
    test("When user hasn't searched for a city, show upcoming events from all cities.", ({
        given,
        when,
        then,
    }) => {
        given("user hasn't search for any city", () => {});
        let AppComponent;
        when('user opens the app', () => {
            AppComponent = render(<App />);
        });

        then('user should see the list of all upcoming events.', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems =
                    within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });
    test('User should see a list of suggestions when they search for a city.', ({
        given,
        when,
        then,
    }) => {
        let AppComponent;
        given('main page is opens', () => {
            AppComponent = render(<App />);
        });
        let CitySearchDOM;
        when('user starts typing in the city textbox', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            const citySearchInput =
                within(CitySearchDOM).queryByRole('textbox');
            await user.type(citySearchInput, 'Berlin');
        });

        then(
            "user should receive a list of cities (suggestions) that match what they've typed",
            () => {
                const suggestionsListItems =
                    within(CitySearchDOM).queryAllByRole('listitem');
                expect(suggestionsListItems).toHaveLength(2);
            }
        );
    });
    test('User can select a city from the suggested list.', ({
        given,
        and,
        when,
        then,
    }) => {
        let AppComponent,
            AppDOM,
            CitySearchDOM,
            citySearchInput,
            suggestionsListItems;
        given('user was typing "Berlin" in the city textbox', async () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            citySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(citySearchInput, 'Berlin');
        });

        and('the list of suggested cities is showing', () => {
            suggestionsListItems =
                within(CitySearchDOM).queryAllByRole('listitem');
            expect(suggestionsListItems).toHaveLength(2);
        });

        when(
            /^user selects a city \(e.g: "(.*)"\) from the list$/,
            async (arg0) => {
                const user = userEvent.setup();
                await user.click(suggestionsListItems[0]);
            }
        );

        then(
            /^their city should be changed to that city \(i.e: "(.*)"\)$/,
            (arg0) => {
                expect(citySearchInput).toHaveValue('Berlin, Germany');
            }
        );

        and(
            'user should receive a list of upcoming events in that city',
            async () => {
                const EventListDOM = AppDOM.querySelector('#event-list');
                const EventListItems =
                    within(EventListDOM).queryAllByRole('listitem');
                const allEvents = await getEvents();

                const berlinEvents = allEvents.filter(
                    (event) => event.location === citySearchInput.value
                );
                expect(EventListItems).toHaveLength(berlinEvents.length);
            }
        );
    });
});
