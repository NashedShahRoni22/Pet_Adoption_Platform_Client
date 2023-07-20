import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import MyPostCard from "../../components/MyPostCard";
import { toast } from "react-hot-toast";

const MyPost = () => {
  const { user } = useContext(AuthContext);
  const userPostUrl = `https://pet-adoption-platform-server.vercel.app/myposts?ownerEmail=${user.email}`;
  const {
    isLoading,
    error,
    data: userPosts,
    refetch
  } = useQuery({
    queryKey: ["petsData"],
    queryFn: () => fetch(userPostUrl).then((res) => res.json()),
  });

  if (isLoading) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;

  const handleDelete = (pr) => {
    const agree = window.confirm(`Are you sure to delete ${pr.name}`);
    if (agree) {
      fetch(`https://pet-adoption-platform-server.vercel.app/myposts/${pr._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.error(`${pr.name} deleted successfully!`);
            refetch();
          }
        });
    }
  };

  return (
    <div className="container mx-auto p-5 my-5 min-h-screen">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-tr from-[#2D1B69] to-black  text-2xl md:text-4xl font-extrabold">
        My Pets
      </h2>
      {userPosts.length ? (
        <div className="grid lg:grid-cols-2 gap-4 mt-5">
          {userPosts.map((up) => (
            <MyPostCard up={up} key={up._id} handleDelete={handleDelete}/>
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
