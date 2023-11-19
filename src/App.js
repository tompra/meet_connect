import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { useEffect, useState } from 'react';
import { getEvents, extractLocations } from './api';

const App = () => {
    const [events, setEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(32);
    const [allLocations, setAllLocations] = useState([]);
    const [currentCity, setCurrentCity] = useState('See all cities');

    const fetchData = async () => {
        const allEvents = await getEvents();
        const filteredEvents =
            currentCity === 'See all cities'
                ? allEvents
                : allEvents.filter((event) => event.location === currentCity);

        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
    };

    useEffect(() => {
        fetchData();
    }, [currentCity, currentNOE]);

    return (
        <div className='App container-fluid pt-5'>
            <div className='d-flex justify-content-center flex-column align-items-center'>
                <CitySearch
                    allLocations={allLocations}
                    setCurrentCity={setCurrentCity}
                />
                <NumberOfEvents setCurrentNOE={setCurrentNOE} />
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center'>
                <EventList events={events} />
            </div>
        </div>
    );
};

export default App;
