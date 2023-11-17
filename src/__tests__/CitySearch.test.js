import { render, within } from '@testing-library/react';
import CitySearch from '../CitySearch';
import userEvent from '@testing-library/user-event';
import { getEvents, extractLocations } from '../api';
import App from '../App';

describe('<CitySearch /> component', () => {
    let CitySearchComponent;
    beforeEach(() => {
        CitySearchComponent = render(<CitySearch allLocations={[]} />);
    });

    test('render text input', () => {
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestions list in hidden by default', () => {
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });

    test('renders a list of suggestions when city textbox gain focus', async () => {
        const user = userEvent.setup();
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.click(cityTextBox);
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass('suggestions');
    });

    test('updates list of suggestions correctly when user types in city textbox', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(
            <CitySearch allLocations={allLocations} />
        );

        //user types "Berlin" in city textbox
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin');

        // filter allLocations to location matching "Berlin"
        const suggestions = allLocations
            ? allLocations.filter((location) => {
                  return (
                      location
                          .toUpperCase()
                          .indexOf(cityTextBox.value.toUpperCase()) > -1
                  );
              })
            : [];

        // get all <li> elements inside the suggestion list
        const suggestionListItems =
            CitySearchComponent.queryAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
        }
    });

    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(
            <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
        );

        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin, Germany');

        const BerlinGermanySuggestion =
            CitySearchComponent.queryAllByRole('listitem')[0];
        await user.click(BerlinGermanySuggestion);

        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });

    test('renders the "See all cities" when user types an non existent city', async () => {
        // Calling user, events and locations variables
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        // Rerender CitySearchComponent
        CitySearchComponent.rerender(
            <CitySearch allLocations={allLocations} />
        );

        // Locate input field
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        // User types non existent city
        await user.type(cityTextBox, 'NonExistentCity');
        // suggestion list should render See all cities
        const suggestionsListItems =
            CitySearchComponent.queryAllByRole('listitem');
        expect(suggestionsListItems.length).toBe(1);
        expect(suggestionsListItems[0].textContent).toBe('See all cities');
    });
});

describe('<CitySearch /> integration', () => {
    test('renders suggestions list when the app is rendered', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
        await user.click(cityTextBox);

        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        const suggestionListItems =
            within(CitySearchDOM).queryAllByRole('listitem');

        expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
});
