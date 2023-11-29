const Welcome = ({ getAccessToken }) => {
    return (
        <div>
            <h1>MeetConnect</h1>
            <p>Please login to access the events</p>
            <button onClick={() => getAccessToken()}>Login</button>
        </div>
    );
};

export default Welcome;
