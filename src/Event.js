import { useState } from 'react';

const Event = ({ event }) => {
    const [showHideBtn, setShowHideBtn] = useState(false);

    const handleDetails = () => {
        setShowHideBtn(true);
    };

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
            <button onClick={handleDetails}>
                {showHideBtn ? 'Hide details' : 'Show details'}
            </button>
        </li>
    );
};

export default Event;
