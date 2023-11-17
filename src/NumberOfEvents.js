const NumberOfEvents = ({ setCurrentNOE }) => {
    const handleChange = (e) => {
        setCurrentNOE(e.target.value);
    };

    return (
        <>
            <input
                type='text'
                defaultValue='32'
                id='number-of-events'
                onChange={handleChange}
            />
        </>
    );
};

export default NumberOfEvents;
