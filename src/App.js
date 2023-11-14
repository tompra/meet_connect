import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';

const App = () => {
    return (
        <div className='App'>
            <CitySearch />
            <EventList />
        </div>
    );
};

export default App;
