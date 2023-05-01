import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import MyPostCard from "../../components/MyPostCard";

const MyPost = () => {
  const { user } = useContext(AuthContext);
  const userPostUrl = `http://localhost:5000/myposts?ownerEmail=${user.email}`;
  const {
    isLoading,
    error,
    data: userPosts,
  } = useQuery({
    queryKey: ["petsData"],
    queryFn: () => fetch(userPostUrl).then((res) => res.json()),
  });

  if (isLoading) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="container mx-auto p-5 my-5">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-pink-500  text-2xl md:text-4xl font-extrabold">
        My Post
      </h2>
      {userPosts.length ? (
        <div className="grid lg:grid-cols-2 gap-4 mt-5">
          {userPosts.map((up) => (
            <MyPostCard up={up} key={up._id} />
          ))}
        </div>
      ) : (
        <p className="p-5 shadow-xl rounded-xl text-red-500 font-semibold text-center">
          You did't add any post!
        </p>
      )}
    </div>
  );
};

export default MyPost;
