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
        try {
            const allEvents = await getEvents();
            const filteredEvents =
                currentCity === 'See all cities'
                    ? allEvents
                    : allEvents.filter(
                          (event) =>
                              event.location && event.location === currentCity
                      );

            setEvents(filteredEvents.slice(0, currentNOE));
            setAllLocations(extractLocations(allEvents));
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentCity, currentNOE]);

    return (
        <div className='App container-fluid pt-5 d-flex flex-column justify-content-center align-items-center'>
            <div className='col-md-4'>
                <CitySearch
                    allLocations={allLocations}
                    setCurrentCity={setCurrentCity}
                />
            </div>
            <div className='col-md-4'>
                <NumberOfEvents setCurrentNOE={setCurrentNOE} />
            </div>
            <div className='col-md-4'>
                <EventList events={events} />
            </div>
        </div>
    );
};

export default App;
