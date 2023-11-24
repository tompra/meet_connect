import Event from './Event';

const EventList = ({ events }) => {
    return (
        <ul
            id='event-list'
            className='list-group d-flex justify-content-center align-items-center flex-column m-0'
        >
            {events
                ? events.map((event, index) => (
                      <Event event={event} index={index} key={event.id} />
                  ))
                : null}
        </ul>
    );
};

export default EventList;
