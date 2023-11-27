const NumberOfEvents = ({ setCurrentNOE, setWarningAlert }) => {
    const handleChange = (e) => {
        let warningText;
        const userInput = e.target.value;
        if (isNaN(userInput) || parseFloat(userInput) <= 0) {
            warningText = 'Invalid input. Please try a valid number.';
        } else {
            warningText = '';
            setCurrentNOE(userInput);
        }
        setWarningAlert(warningText);
    };

    return (
        <div className='pt-3 d-flex flex-column justify-content-center align-items-center'>
            <h4 className='text-white text-center'>
                Filter by number of events
            </h4>
            <input
                type='text'
                defaultValue='32'
                id='number-of-events'
                onChange={handleChange}
                placeholder='Number of events'
                className='form-control mb-3'
            />
        </div>
    );
};

export default NumberOfEvents;
