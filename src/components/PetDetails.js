import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { Button, Textarea } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { MdReviews, MdPerson3, MdEmail } from "react-icons/md";

const PetDetails = () => {
  const data = useLoaderData();
  const {
    _id,
    price,
    name,
    location,
    image,
    genre,
    categorey,
    age,
    details,
    postTime,
  } = data;
  const { user } = useContext(AuthContext);
  const reviewsurl = `https://pet-adoption-platform-server.vercel.app/reviews?petId=${_id}`;

  const {
    isLoading,
    error,
    data: petReviews,
    refetch,
  } = useQuery({
    queryKey: ["petsData"],
    queryFn: () => fetch(reviewsurl).then((res) => res.json()),
  });
  if (isLoading) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;
  const handleAddReview = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const review = {
      petId: _id,
      petName: name,
      petImg: image,
      userName: user.displayName,
      userEmail: user.email,
      reviewMsg: comment,
    };
    fetch("https://pet-adoption-platform-server.vercel.app/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          e.target.reset();
          toast.success("Thanks For Your Review");
          refetch();
        }
      })
      .catch((e) => console.error(e));
  };
  return (
    <div className="container mx-auto my-10">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-pink-500  text-2xl md:text-4xl font-extrabold text-center">
        Details of {name}
      </h2>
      <div className="md:flex gap-4 mt-5 shadow-xl">
        <img
          alt="pet_image"
          src={image}
          className="h-[200px] w-[200px] rounded-l-xl"
        />

        <div className="font-semibold text-purple-500">
          <p>Name: {name}</p>
          <p>Genre: {genre}</p>
          <p>Categorey: {categorey}</p>
          <p>Age: {age} Years</p>
          <p>Location: {location}</p>
          <p>Price: {price} TK</p>
          <p>Post Time: {postTime}</p>
          <p>Details: {details}</p>
        </div>
      </div>
      {user?.uid ? (
        <form className="mt-5 shadow-xl p-5" onSubmit={handleAddReview}>
          <Textarea
            label="Enter Comment"
            name="comment"
            variant="standard"
            color="purple"
          />
          <Button size="sm" type="submit" color="purple">
            Comment
          </Button>
        </form>
      ) : (
        <div className="mt-5">
          <Link to="/login" className="text-purple-500 font-semibold">
            Please login to add a comment!
          </Link>
        </div>
      )}
      <div className="mt-5">
        {petReviews.length >= 1 ? (
          <table className="table-auto w-full shadow-xl">
            <thead>
              <tr>
                <th className="px-4 py-2 text-purple-500">
                  <MdPerson3 className="text-2xl" />
                </th>
                <th className="px-4 py-2 text-purple-500">
                  <MdEmail className="text-2xl" />
                </th>
                <th className="px-4 py-2 text-purple-500">
                  <MdReviews className="text-2xl" />
                </th>
              </tr>
            </thead>
            <tbody>
              {petReviews.map((pr, i) => (
                <tr key={i} className="hover:bg-gray-300">
                  <td className="border-x-2 border-purple-400 px-4 py-2">
                    {pr.userName}
                  </td>
                  <td className="border-x-2 border-purple-400 px-4 py-2">
                    {pr.userEmail}
                  </td>
                  <td className="border-purple-400 px-4 py-2">
                    {pr.reviewMsg}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-purple-500 font-semibold shadow-xl p-5">
            No reviews yet!
          </p>
        )}
      </div>
    </div>
  );
};

export default PetDetails;
