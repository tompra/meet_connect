import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;

    beforeEach(() => {
        NumberOfEventsComponent = render(
            <NumberOfEvents
                setCurrentNOE={() => {}}
                setWarningAlert={() => {}}
            />
        );
    });
    // input field contains the input number element
    test('default number of event display', () => {
        const numberEventBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberEventBox).toBeInTheDocument();
    });
    // default number of 32 event displayed
    test('32 as default number of events displayed', async () => {
        const numberEventBox =
            NumberOfEventsComponent.container.querySelector(
                '#number-of-events'
            );

        expect(numberEventBox.value).toBe('32');
    });
    // user text input changes
    test('number of events changes accordingly when user types', async () => {
        const numberEventBox =
            NumberOfEventsComponent.container.querySelector(
                '#number-of-events'
            );
        const user = userEvent.setup();
        await user.type(numberEventBox, '{backspace}{backspace}10');
        expect(numberEventBox.value).toBe('10');
    });
});
