const Welcome = ({ getAccessToken }) => {
    return (
        <div>
            <h1 className='text-white'>MeetConnect</h1>
            <p className='text-white'>Please login to access the events</p>
            <button
                className='btn btn-primary'
                onClick={() => getAccessToken()}
            >
                Login
            </button>
        </div>
    );
};

export default Welcome;
