import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { Button, Textarea } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

const PetDetails = () => {
  const data = useLoaderData();
  const { _id, price, name, location, img, genre, categorey, age } = data;
  const { user } = useContext(AuthContext);
  const reviewsurl = `http://localhost:5000/reviews?petId=${_id}`;

  const {
    isLoading,
    error,
    data: petReviews,
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
      petImg: img,
      userName: user.displayName,
      userEmail: user.email,
      reviewMsg: comment,
    };
    fetch("http://localhost:5000/reviews", {
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
        }
      })
      .catch((e) => console.error(e));
  };
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
      {user?.uid ? (
        <form className="mt-5 shadow-xl p-5" onSubmit={handleAddReview}>
          <Textarea label="Enter Comment" name="comment" variant="standard" />
          <Button size="sm" type="submit">
            Comment
          </Button>
        </form>
      ) : (
        <div className="mt-5">
          <Link to="/login" className="text-blue-500 font-semibold">
            Please login to add a comment!
          </Link>
        </div>
      )}
      <div className="mt-5">
        {petReviews.length >= 1 ? (
          <table className="table-auto w-full shadow-xl">
            <thead>
              <tr>
                <th className="bg-blue-400 border border-blue-400 px-4 py-2 text-white">
                  User Name
                </th>
                <th className="bg-blue-400 border border-blue-400 px-4 py-2 text-white">
                  User Email
                </th>
                <th className="bg-blue-400 border border-blue-400 px-4 py-2 text-white">
                  Review
                </th>
              </tr>
            </thead>
            <tbody>
              {petReviews.map((pr,i) => (
                <tr key={i}>
                  <td className="border border-blue-400 px-4 py-2">
                    {pr.userName}
                  </td>
                  <td className="border border-blue-400 px-4 py-2">
                    {pr.userEmail}
                  </td>
                  <td className="border border-blue-400 px-4 py-2">
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
