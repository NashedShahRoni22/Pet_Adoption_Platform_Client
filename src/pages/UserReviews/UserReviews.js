import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";

const UserReviews = () => {
  const { user } = useContext(AuthContext);
  const userReviewsUrl = `http://localhost:5000/userReviews?userEmail=${user.email}`;
  const {
    isLoading,
    error,
    data: userReviews,
  } = useQuery({
    queryKey: ["petsData"],
    queryFn: () => fetch(userReviewsUrl).then((res) => res.json()),
  });

  if (isLoading) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="container mx-auto my-5">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-pink-500  text-2xl md:text-4xl font-extrabold">
        My Reviews
      </h2>
      {userReviews.length ? (
        <div className="mt-5 grid lg:grid-cols-2 gap-4">
          {userReviews.map((pr, i) => (
            <div key={i} className="flex gap-4 items-center my-1 shadow-xl ">
              <img
                alt="pet_img"
                src={pr.petImg}
                className="h-[100px] w-[100px]"
              />

              <div className="font-semibold text-blue-400"> 
                <p>Pet Name: {pr.petName}</p>
                <p>Review Message: {pr.reviewMsg}</p>
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

export default UserReviews;
