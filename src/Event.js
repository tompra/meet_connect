const Event = ({ event }) => {
    return (
        <li>
            <p>
                Title: <span>{event.summary}</span>
            </p>
            <p>
                Start time: <span>{event.created}</span>
            </p>
            <p>
                Location: <span>{event.location}</span>
            </p>
        </li>
    );
};

export default Event;
