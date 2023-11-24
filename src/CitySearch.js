import { useEffect, useState } from 'react';
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
        <div
            id='city-search'
            className='form-group d-flex justify-content-center flex-column align-items-center'
        >
            <input
                type='text'
                className='form-control city'
                placeholder='Search for a city...'
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onChange={handleInputChanged}
            />
            {showSuggestions ? (
                <ul className='list-group suggestions'>
                    {suggestions.map((suggestion) => {
                        return (
                            <li
                                onClick={handleItemClicked}
                                key={suggestion}
                                className='list-group-item'
                            >
                                {suggestion}
                            </li>
                        );
                    })}
                    <li
                        key='See all cities'
                        onClick={handleItemClicked}
                        className='list-group-item'
                    >
                        <b>See all cities</b>
                    </li>
                </ul>
            ) : null}
        </div>
    );
};

export default CitySearch;
