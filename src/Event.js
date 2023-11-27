import { useState } from 'react';

const Event = ({ event, index }) => {
    const [showHideBtn, setShowHideBtn] = useState(false);

    const handleDetails = () => {
        setShowHideBtn(!showHideBtn);
    };

    const detailsAlignment = index % 2 === 0 ? 'right-aligned' : 'left-aligned';

    const changeDate = new Date(event.created);

    const formattedChangeDate = changeDate.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    return (
        <div className='card'>
            <div className='card-body d-flex flex-column justify-content-center align-items-center'>
                <h5 className='card-title'>
                    Title: <span>{event.summary}</span>
                </h5>
                <p className='card-text'>
                    Start time: <span>{formattedChangeDate}</span>
                </p>
                <p className='card-text'>
                    Location: <span>{event.location}</span>
                </p>
                <button
                    className='btn btn-primary details-btn'
                    onClick={handleDetails}
                >
                    {showHideBtn ? 'Hide details' : 'Show details'}
                </button>
                {showHideBtn ? (
                    <div
                        className={`details bg-primary text-white rounded p-3 ${detailsAlignment}`}
                    >
                        <h5 className='card-title'>Event Details</h5>
                        <p className='card-text'>
                            Description: <span>{event.description}</span>
                        </p>
                        <p className='card-text text-bold'>
                            Status:{' '}
                            <span className='text-capitalize'>
                                {event.status}
                            </span>
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Event;
