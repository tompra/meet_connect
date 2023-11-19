import { InputGroup, Form } from 'react-bootstrap';
const NumberOfEvents = ({ setCurrentNOE }) => {
    const handleChange = (e) => {
        setCurrentNOE(e.target.value);
    };

    return (
        <div className='d-flex flex-column justify-content-center my-2 w-25'>
            <h4 className='text-white'>Filter by number of events</h4>
            <InputGroup className='mb-3'>
                <Form.Control
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    type='text'
                    defaultValue='32'
                    id='number-of-events'
                    onChange={handleChange}
                    placeholder='Number of events'
                />
            </InputGroup>
        </div>
    );
};

export default NumberOfEvents;
