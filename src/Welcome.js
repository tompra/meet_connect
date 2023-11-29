const Welcome = ({ getAccessToken }) => {
    const handleLogin = async () => {
        const { authUrl } = await getAccessToken();
        window.location.href = authUrl;
    };

    return (
        <div>
            <h1 className='text-white'>MeetConnect</h1>
            <p className='text-white'>Please login to access the events</p>
            <button className='btn btn-primary' onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default Welcome;
