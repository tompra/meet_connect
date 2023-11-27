import Event from './Event';

const EventList = ({ events }) => {
    return (
        <ul
            id='event-list'
            className='list-group d-flex flex-wrap justify-content-center align-items-center m-0'
        >
            {events
                ? events.map((event, index) => (
                      <li
                          key={event.id}
                          className='mx-2 mb-3 '
                          style={{ width: '100%', maxWidth: '22rem' }}
                      >
                          <Event event={event} index={index} />
                      </li>
                  ))
                : null}
        </ul>
    );
};

export default EventList;
