import React, { useContext, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import BookingModal from "./BookingModal";
import { AuthContext } from "../context/AuthProvider";
const PetCard = ({ pet }) => {
  const [open, setOpen] = useState(false);
  const [bookingData, setBookingData] = useState("");

  const { user } = useContext(AuthContext);

  const handleOpen = () => {
    setOpen(!open);
    setBookingData(pet);
  };
  const { _id, name, image, genre } = pet;
  return (
    <div className="p-2 border hover:shadow-xl rounded-xl bg-white">
      <div className="relative group">
        <img
          src={image}
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
      <p className="font-semibold">Genre: {genre}</p>
      {user?.email ? (
        <Button size="sm" className="mt-3 w-full" onClick={handleOpen}>
          Book Now
        </Button>
      ) : (
        <NavLink to="/login">
          <Button size="sm" className="mt-3 w-full" color="purple">
            Login Now
          </Button>
        </NavLink>
      )}

      <BookingModal
        open={open}
        handleOpen={handleOpen}
        bookingData={bookingData}
      />
    </div>
  );
};

export default PetCard;
