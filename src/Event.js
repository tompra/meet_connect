import { useState } from 'react';

const Event = ({ event }) => {
    const [showHideBtn, setShowHideBtn] = useState(false);

    const handleDetails = () => {
        setShowHideBtn(!showHideBtn);
    };

    return (
        <li
            className='card my-3 bg-secondary-subtle'
            style={{ width: '22rem' }}
        >
            <div className='card-body d-flex flex-column justify-content-center align-items-center'>
                <h5 className='card-title'>
                    Title: <span>{event.summary}</span>
                </h5>
                <p className='card-text'>
                    Start time: <span>{event.created}</span>
                </p>
                <p className='card-text'>
                    Location: <span>{event.location}</span>
                </p>
                <button className='btn btn-primary' onClick={handleDetails}>
                    {showHideBtn ? 'Hide details' : 'Show details'}
                </button>
            </div>
        </li>
    );
};

export default Event;
