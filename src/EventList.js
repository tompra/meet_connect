import Event from './Event';

const EventList = ({ events }) => {
    return (
        <ul
            id='event-list'
            className='d-flex justify-content-center align-items-center flex-column m-0'
        >
            {events
                ? events.map((event) => <Event event={event} key={event.id} />)
                : null}
        </ul>
    );
};

export default EventList;
