import { useState } from 'react';

const NumberOfEvents = () => {
    const [value, setValue] = useState('32');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <input
            type='number'
            value={value}
            id='number-of-events'
            onChange={handleChange}
        />
    );
};

export default NumberOfEvents;
