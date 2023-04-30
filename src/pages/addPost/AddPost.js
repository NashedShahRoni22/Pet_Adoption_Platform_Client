import { Button, Input, Option, Select, Textarea } from "@material-tailwind/react";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AddPost = () => {
    const {user} = useContext(AuthContext);
  return (
    <div className="container mx-auto p-5 my-10">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-pink-500  text-2xl md:text-4xl font-extrabold">
        Add a Post
      </h2>
      <form className="mt-5">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Input label="Pet Name" name="name" required />
        <input
              type="file"
              name="image"
              accept="image/*"
              className="p-1 border-2 border-blue-400 rounded-lg"
              required
            />
        <Select label="Select Version" name="categorey" required>
          <Option>Cat</Option>
          <Option>Dog</Option>
        </Select>
        <Input label="Pet Genre" name="genre" required />
        <Input label="Price" name="price" required />
        <Input label="Location" name="location" required />
        <Input label="Age(Ex:1.5 Months)" name="age" required />
        <Input label="User Email" defaultValue={user.email} name="userEmail" required />
        <Input label="User Number" name="userNumber" required />
        </div>
        <Textarea label="Enter Details" name="details" required/>
        <Button color="purple">
            Post Now
        </Button>
      </form>
    </div>
  );
};

export default AddPost;
