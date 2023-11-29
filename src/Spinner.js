const Spinner = () => {
    return (
        <div
            className='col-md-6 mt-2 text-center d-flex justify-content-center align-items-center'
            style={{ height: '55rem' }}
        >
            <div className='spinner-grow text-light' role='status'>
                <span className='visually-hidden'> Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;
