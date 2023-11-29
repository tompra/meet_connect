import meetlogo from './images/meet-app-192.png';
import googlelogo from './images/google-logo.png';
const Welcome = ({ getAccessToken }) => {
    const handleLogin = async () => {
        const { authUrl } = await getAccessToken();
        console.log('authUrl from WELCOME', authUrl);
        window.location.href = authUrl;
    };

    return (
        <div className='container'>
            <div
                className='row d-flex flex-column justify-content-center align-items-center'
                style={{ height: '50rem' }}
            >
                <div className='col-md-6 my-4 d-flex flex-column justify-content-center align-items-center'>
                    <h1 className='text-white p-2'>MeetConnect</h1>
                    <div className='img-container'>
                        <img
                            src={meetlogo}
                            alt='Meet connect logo'
                            className='img-fluid meet-logo'
                        />
                    </div>
                </div>
                <div className='col-md-6 my-4 d-flex flex-column justify-content-center'>
                    <h2 className='text-white text-center'>
                        Welcome to MeetConnect, your gateaway to a world of
                        inspiring developer events.
                    </h2>
                    <h3 className='text-white text-center pt-3'>
                        Log in to view events near your city.
                    </h3>
                </div>
                <div className='col-md-6 my-4 d-flex justify-content-center'>
                    <button
                        className='btn btn-primary fs-5'
                        onClick={handleLogin}
                    >
                        Sign in with <b>Google</b>
                        <img
                            src={googlelogo}
                            alt='google logo'
                            className='google-logo'
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
