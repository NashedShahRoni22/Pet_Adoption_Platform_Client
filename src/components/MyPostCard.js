import React from 'react';

const MyPostCard = ({up}) => {
    const {image, name, categorey, postTime, price} = up;
    return (
        <div className='flex gap-4 my-1 shadow-xl rounded-xl'>
            <div>
                <img alt='pet_img' src={image} className='h-[100px] w-[100px] rounded-l-xl' />
            </div>
            <div className=''>
                <p>Pet Name: {name}</p>
                <p>Pet Categorey: {categorey}</p>
                <p>Pet Details: {price} TK</p>
                <p>Post Time: {postTime}</p>
            </div>
        </div>
    );
};

export default MyPostCard;