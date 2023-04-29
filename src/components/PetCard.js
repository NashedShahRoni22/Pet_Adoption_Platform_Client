import React from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const PetCard = ({ pet }) => {
  const { _id, name, img, location, price } = pet;
  return (
    <div className="p-2 border hover:shadow-xl rounded-xl bg-white">
      <div className="relative group">
        <img
          src={img}
          alt="pet_image"
          className="h-[200px] w-[200px] rounded-xl"
        />
        <div className="opacity-0 group-hover:opacity-100 absolute flex justify-center items-end top-0 rounded-xl h-full w-full bg-black/70">
          <Link to={`petdetails/${_id}`}>
            <Button size="sm" className="mb-3">
              Details
            </Button>
          </Link>
        </div>
      </div>
      <p className="font-semibold mt-3">Name: {name}</p>
      <p className="font-semibold">Location: {location}</p>
      <p className="font-semibold">Price: {price}</p>
      <Button size="sm" className="mt-3 w-full">
        Book Now
      </Button>
    </div>
  );
};

export default PetCard;
