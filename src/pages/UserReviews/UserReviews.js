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
    <div className="container mx-auto my-10">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-pink-500  text-2xl md:text-4xl font-extrabold">
        My Reviews
      </h2>
      {
        userReviews.length >= 1 ?
        <table className="mt-5 table-auto w-full shadow-xl">
        <thead>
          <tr>
            <th className="bg-purple-400 border border-purple-400 px-4 py-2 text-white">
              Pet Image
            </th>
            <th className="bg-purple-400 border border-purple-400 px-4 py-2 text-white">
              Pet Name
            </th>
            <th className="bg-purple-400 border border-purple-400 px-4 py-2 text-white">
              Review
            </th>
          </tr>
        </thead>
        <tbody>
          {userReviews.map((pr, i) => (
            <tr key={i}>
              <td className="border border-purple-400 px-4 py-2">
                <img alt="pet_img" src={pr.petImg} className="h-[100px] w-[100px]" />
              </td>
              <td className="border border-purple-400 px-4 py-2">
                {pr.petName}
              </td>
              <td className="border border-purple-400 px-4 py-2">
                {pr.reviewMsg}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      :
      <p className="p-5 shadow-xl rounded-xl text-deep-purple-500 font-semibold">You did't add any reviews yet!</p>
      }
      
    </div>
  );
};

export default UserReviews;
