import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";

const MyBookings = () => {
    const { user } = useContext(AuthContext);
  const userBookingsUrl = `http://localhost:5000/mybookings?buyerEmail=${user.email}`;
  const {
    isLoading,
    error,
    data: userBookings,
  } = useQuery({
    queryKey: ["petsData"],
    queryFn: () => fetch(userBookingsUrl).then((res) => res.json()),
  });

  if (isLoading) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="container mx-auto p-5 my-5">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-pink-500  text-2xl md:text-4xl font-extrabold">
        My Bookings
      </h2>
      {userBookings.length ? (
        <div className="mt-5 grid lg:grid-cols-2 gap-4">
          {userBookings.map((pr, i) => (
            <div key={i} className="flex gap-4 items-center my-1 shadow-xl rounded-xl">
              <img
                alt="pet_img"
                src={pr.productImage}
                className="h-[100px] w-[100px] rounded-l-xl"
              />

              <div className=""> 
                <p>Pet Name: {pr.name}</p>
                <p>Pet Price: {pr.price}</p>
                <p>Owner Email: {pr.ownerEmail}</p>
                <p>Owner Number: {pr.ownerNumber}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="p-5 shadow-xl rounded-xl text-red-500 font-semibold text-center">
          You did't add any reviews yet!
        </p>
      )}
    </div>
  );
};

export default MyBookings;
