import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import { AiOutlineDelete } from "react-icons/ai";
import { Tooltip } from "@material-tailwind/react";
import { toast } from "react-hot-toast";

const UserReviews = () => {
  const { user } = useContext(AuthContext);
  const userReviewsUrl = `https://pet-adoption-platform-server.vercel.app/myreviews?userEmail=${user.email}`;
  const {
    isLoading,
    error,
    data: userReviews,
    refetch,
  } = useQuery({
    queryKey: ["petsData"],
    queryFn: () => fetch(userReviewsUrl).then((res) => res.json()),
  });

  if (isLoading) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;

  const handleDelete = (pr) => {
    const agree = window.confirm(`Are you sure to delete ${pr.petName}`);
    if (agree) {
      fetch(`https://pet-adoption-platform-server.vercel.app/reviews/${pr._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.error(`${pr.petName} deleted successfully!`);
            refetch();
          }
        });
    }
  };
  return (
    <div className="container mx-auto my-5">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-pink-500  text-2xl md:text-4xl font-extrabold">
        My Reviews
      </h2>
      {userReviews.length ? (
        <div className="mt-5 grid lg:grid-cols-2 gap-4">
          {userReviews.map((pr, i) => (
            <div
              key={i}
              className="flex justify-between items-center my-1 shadow-xl rounded-xl"
            >
              <div className="flex gap-2 items-center">
                <img
                  alt="pet_img"
                  src={pr.petImg}
                  className="h-[100px] w-[100px] rounded-l-xl"
                />

                <div className="">
                  <p>Pet Name: {pr.petName}</p>
                  <p>Review Message: {pr.reviewMsg}</p>
                </div>
              </div>
              <Tooltip content="Delete" placement="bottom">
                <button className="mr-5 p-2 rounded-full bg-red-100" onClick={()=> handleDelete(pr)}>
                  <AiOutlineDelete className="text-3xl text-red-500" />
                </button>
              </Tooltip>
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
