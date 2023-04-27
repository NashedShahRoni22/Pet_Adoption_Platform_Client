import React from 'react';

const PetCard = ({pet}) => {
    const {name, img, location, price} = pet;
    return (
        <div className='p-2 border hover:shadow-xl rounded-xl bg-white'>
            <img src={img} alt='pet_image' className='h-[200px] w-[200px]'/>
            <p className='font-semibold'>Name: {name}</p>
            <p className='font-semibold'>Location: {location}</p>
            <p className='font-semibold'>Price: {price}</p>
        </div>
    );
};

export default PetCard;