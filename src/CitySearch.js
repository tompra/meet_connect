import { useEffect, useState } from 'react';
import { InputGroup, Form, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CitySearch = ({ allLocations, setCurrentCity }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setSuggestions(allLocations);
    }, [`${allLocations}`]);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations
            ? allLocations.filter((location) => {
                  return (
                      location.toUpperCase().indexOf(value.toUpperCase()) > -1
                  );
              })
            : [];
        setQuery(value);
        setSuggestions(filteredLocations);
    };

    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false);
        setCurrentCity(value);
    };

    return (
        <div id='city-search'>
            <InputGroup className='mb-3 d-flex flex-column'>
                <Form.Control
                    type='text'
                    className='city w-100 rounded'
                    placeholder='Search for a city...'
                    value={query}
                    onFocus={() => setShowSuggestions(true)}
                    onChange={handleInputChanged}
                />

                {showSuggestions ? (
                    <ListGroup as='ul' className='suggestions rounded '>
                        {suggestions.map((suggestion) => {
                            return (
                                <ListGroup.Item
                                    onClick={handleItemClicked}
                                    key={suggestion}
                                    as='li'
                                >
                                    {suggestion}
                                </ListGroup.Item>
                            );
                        })}
                        <ListGroup.Item
                            key='See all cities'
                            onClick={handleItemClicked}
                            as='li'
                        >
                            <b>See all cities</b>
                        </ListGroup.Item>
                    </ListGroup>
                ) : null}
            </InputGroup>
        </div>
    );
};

export default CitySearch;
