import { ListGroup } from 'react-bootstrap';
import Event from './Event';

const EventList = ({ events }) => {
    return (
        <div id='event-list'>
            {events.length > 0 ? (
                events.map((event) => (
                    <ListGroup
                        key={event.id}
                        className='w-100 number-events-container'
                    >
                        <Event event={event} />
                    </ListGroup>
                ))
            ) : (
                <h4 className='text-warning text-center bg-danger rounded h-100'>
                    Choose number of events
                </h4>
            )}
        </div>
    );
};

export default EventList;
