import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import { AiOutlineDelete, AiFillMoneyCollect } from "react-icons/ai";
import { Button, Tooltip } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import PaymentModal from "../../components/PaymentModal";
const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [paymentData, setPaymentData] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = (data) => {
    setOpen(!open);
    setPaymentData(data);
  };
  const userBookingsUrl = `https://pet-adoption-platform-server.vercel.app/mybookings?buyerEmail=${user.email}`;
  const {
    isLoading,
    error,
    data: userBookings,
    refetch,
  } = useQuery({
    queryKey: ["petsData"],
    queryFn: () => fetch(userBookingsUrl).then((res) => res.json()),
  });

  if (isLoading) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;

  const handleDelete = (pr) => {
    const agree = window.confirm(`Are you sure to delete ${pr.name}`);
    if (agree) {
      fetch(`https://pet-adoption-platform-server.vercel.app/bookings/${pr._id}`, {
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

  const handlePayment = (data) => {
    setOpen(!open);
    fetch(`https://pet-adoption-platform-server.vercel.app/paidproducts/${data.productId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.matchedCount > 0) {
          toast.success(`Payment done for ${paymentData.name} successfully!`);
          fetch(
            `https://pet-adoption-platform-server.vercel.app/paidbookingproducts/${paymentData._id}`,
            {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.matchedCount > 0) {
                refetch();
              }
            });
        }
      });
  };

  return (
    <div className="container mx-auto p-5 my-5">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-pink-500  text-2xl md:text-4xl font-extrabold">
        My Bookings
      </h2>
      {userBookings.length ? (
        <div className="mt-5 grid lg:grid-cols-2 gap-4">
          {userBookings.map((pr, i) => (
            <div
              key={i}
              className="flex justify-between items-center my-1 shadow-xl rounded-xl"
            >
              <div className="flex gap-2">
                <img
                  alt="pet_img"
                  src={pr.productImage}
                  className="h-[100px] w-[100px] rounded-l-xl"
                />

                <div className="">
                  <p>Pet Name: {pr.name}</p>
                  <p>Pet Price: {pr.price}</p>
                  <p>Owner Email: {pr.ownerEmail}</p>
                  <p>Owner Number: {pr.ownerNumber}</p>
                </div>
              </div>
              {pr.isPaid ? (
                <Button color="green" size="sm" className="mr-5">
                  Paid
                </Button>
              ) : (
                <div className="flex gap-4 mr-5">
                  <Tooltip content="Delete" placement="bottom">
                    <button
                      className="p-2 rounded-full bg-red-100"
                      onClick={() => handleDelete(pr)}
                    >
                      <AiOutlineDelete className="text-3xl text-red-500" />
                    </button>
                  </Tooltip>

                  <Tooltip content="Payment" placement="bottom">
                    <button
                      className="p-2 rounded-full bg-green-100"
                      onClick={() => handleOpen(pr)}
                    >
                      <AiFillMoneyCollect className="text-3xl text-green-500" />
                    </button>
                  </Tooltip>
                </div>
              )}
              <PaymentModal
                handlePayment={handlePayment}
                open={open}
                handleOpen={handleOpen}
                paymentData={paymentData}
                setOpen={setOpen}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="p-5 shadow-xl rounded-xl text-red-500 font-semibold text-center">
          You don't have any bookings!
        </p>
      )}
    </div>
  );
};

export default MyBookings;
