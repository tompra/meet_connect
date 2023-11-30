import meetlogo from './images/meet-app-192.png';
const Loading = () => {
    return (
        <div className='container'>
            <div
                className='row d-flex flex-column justify-content-center align-items-center'
                style={{ height: '50rem' }}
            >
                <div className='col-md-6 my-4 d-flex  justify-content-center align-items-center'>
                    <div className='img-container'>
                        <img
                            src={meetlogo}
                            alt='Meet connect logo'
                            className='img-fluid meet-logo'
                        />
                    </div>
                </div>
                <div className='col-md-6 my-4 d-flex justify-content-center align-items-center'>
                    <h1 className='text-white'>Loading</h1>
                    <div className='dot-pulse'></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
