import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

const App = () => {
    return (
        <div className='App'>
            <NumberOfEvents />
            <CitySearch />
            <EventList />
        </div>
    );
};

export default App;
