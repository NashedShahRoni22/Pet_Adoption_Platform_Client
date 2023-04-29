import React from "react";
import { useLoaderData } from "react-router-dom";

const PetDetails = () => {
  const data = useLoaderData();
  const { price, name, location, img, genre, categorey, age } = data;
  return (
    <div className="container mx-auto my-10">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-pink-500  text-2xl md:text-4xl font-extrabold text-center">
        Details of {name}
      </h2>
      <div className="flex items-center justify-around mt-5 shadow-xl p-5">
        <img alt="pet_image" src={img} className="h-[200px] w-[200px]" />
        <div className="font-semibold">
          <p>Name: {name}</p>
          <p>Genre: {genre}</p>
          <p>Categorey: {categorey}</p>
          <p>Age: {age}</p>
          <p>Location: {location}</p>
          <p>Price: {price}</p>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
