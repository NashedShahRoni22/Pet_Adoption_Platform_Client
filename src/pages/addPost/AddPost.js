import { Button } from "@material-tailwind/react";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const time = new Date().toLocaleTimeString();
  const navigate = useNavigate();

  const handleAddPost = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const categorey = form.categorey.value;
    const genre = form.genre.value;
    const image = form.image.files[0];
    const price = form.price.value;
    const location = form.location.value;
    const age = form.age.value;
    const details = form.details.value;
    const ownerEmail = user.email;
    const ownerNumber = form.userNumber.value;
    const postTime = time;

    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=a375baaa0ac7c9e83ca494f73c2dfe49`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const pet = {
          name,
          categorey,
          genre,
          image: imageData.data.display_url,
          price,
          location,
          age,
          details,
          ownerEmail,
          ownerNumber,
          postTime,
          isPaid: false,
        };
        form.reset();
        addProduct(pet);
        console.log(pet);
      })
      .catch((e) => console.log(e));
  };
  //save pet post in DB
  const addProduct = (product) => {
    fetch("https://pet-adoption-platform-server.vercel.app/pets", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Post added successfully!");
          navigate("/");
        }
      });
  };
  return (
    <div className="container mx-auto p-5 my-5 min-h-screen">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-tr from-[#2D1B69] to-black  text-2xl md:text-4xl font-extrabold">
        Add a Pet
      </h2>
      <form className="mt-5" onSubmit={handleAddPost}>
        <span class="sr-only">Choose Pet photo</span>
        <input
          type="file"
          name="image"
          class="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
        />
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <input
            className="focus:outline-[#2D1B69] rounded-lg px-4 py-2 border-2 border-gray-400"
            placeholder="Pet Name"
            name="name"
            required
          />
          {/* <input
            type="file"
            name="image"
            accept="image/*"
            className="p-1 border-2 border-gray-400 rounded-lg"
            required
          /> */}
          <select
            label="Select Version"
            name="categorey"
            className="p-1 border-2 border-gray-400 rounded-lg"
          >
            <option className="p-1 border-2">Cat</option>
            <option className="p-1 border-2">Dog</option>
          </select>
          <input
            className="focus:outline-[#2D1B69] rounded-lg px-4 py-2 border-2 border-gray-400"
            placeholder="Genre"
            name="genre"
            required
          />
          <input
            className="focus:outline-[#2D1B69] rounded-lg px-4 py-2 border-2 border-gray-400"
            placeholder="Enter Price"
            name="price"
            required
          />
          <input
            className="focus:outline-[#2D1B69] rounded-lg px-4 py-2 border-2 border-gray-400"
            placeholder="Enter Age(Ex:1.5 Years)"
            name="age"
            required
          />
          <input
            className="focus:outline-[#2D1B69] rounded-lg px-4 py-2 border-2 border-gray-400"
            placeholder="Enter Location"
            name="location"
            required
          />
          <input
            className="focus:outline-[#2D1B69] rounded-lg px-4 py-2 border-2 border-gray-400"
            placeholder="Enter Contact Number"
            name="userNumber"
            required
          />
        </div>
        <textarea
          className="focus:outline-[#2D1B69] rounded-lg px-4 py-2 border-2 border-gray-400 w-full"
          rows="4"
          cols="50"
          label="Enter Details"
          name="details"
          required
          placeholder="Enter Pet Details"
        />
        <Button type="submit" className="bg-[#2D1B69] mt-4">
          Post Now
        </Button>
      </form>
    </div>
  );
};

export default AddPost;
