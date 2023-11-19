import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

const Event = ({ event }) => {
    const [showHideBtn, setShowHideBtn] = useState(false);

    const handleDetails = () => {
        setShowHideBtn(!showHideBtn);
    };

    const formatDate = (created) => {
        return new Date(created).toLocaleDateString();
    };

    return (
        <Card style={{ margin: '15px 0' }}>
            <Card.Body>
                <Card.Title>
                    Title: <span>{event.summary}</span>
                </Card.Title>
                <Card.Text>
                    Start time: <span>{formatDate(event.created)}</span>
                </Card.Text>
                <Card.Text>
                    Location: <span>{event.location}</span>
                </Card.Text>
                <Button onClick={handleDetails}>
                    {showHideBtn ? 'Hide details' : 'Show details'}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Event;
