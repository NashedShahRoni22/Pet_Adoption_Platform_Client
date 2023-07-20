import { Button, Tooltip } from "@material-tailwind/react";
import React from "react";
import { AiOutlineDelete, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const MyPostCard = ({ up, handleDelete }) => {
  const { _id, image, name, categorey, postTime, price, isPaid } = up;
  return (
    <div className="flex gap-4 my-1 items-center justify-between shadow-xl rounded-xl">
      <div className="flex gap-2">
        <img
          alt="pet_img"
          src={image}
          className="h-[100px] w-[100px] rounded-l-xl"
        />
        <div className="">
          <p>Name: {name}</p>
          <p>Categorey: {categorey}</p>
          <p>Price: {price} BDT</p>
          <p>Post Time: {postTime}</p>
        </div>
      </div>

      <div className="flex">
        {isPaid ? (
          <Button color="green" size="sm" className="mr-5" >Paid</Button>
        ) : (
          <Tooltip content="Delete" placement="bottom">
            <button
              className="mr-5 p-2 rounded-full bg-red-100"
              onClick={() => handleDelete(up)}
            >
              <AiOutlineDelete className="text-3xl text-red-500" />
            </button>
          </Tooltip>
        )}

        <Link to={`/petdetails/${_id}`}>
          <Tooltip content="View Details" placement="bottom">
            <button className="mr-5 p-2 rounded-full bg-blue-100">
              <AiFillEye className="text-3xl text-blue-500" />
            </button>
          </Tooltip>
        </Link>
      </div>
    </div>
  );
};

export default MyPostCard;
