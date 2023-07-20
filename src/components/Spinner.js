import React from 'react';

const Spinner = () => {
    return (
        <div className='min-h-screen flex items-center shadow-xl justify-center'>
            <p className='text-5xl text-center animate-pulse font-extrabold text-blue-600'>LOADING...</p>
        </div>
    );
};

export default Spinner;