import { useContext } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-hot-toast";

export default function BookingModal({ open, handleOpen, bookingData }) {
  const { _id, image, name, location, price, ownerEmail, ownerNumber } = bookingData;
  const { user } = useContext(AuthContext);

  const handleBooking =(e)=>{
    e.preventDefault();
    const form = e.target;
    const buyerNumber = form.buyerNumber.value;
    const buyerEmail = user.email;

    const bookingData = {
      productId: _id,
      productImage: image,
      name,
      price,
      location,
      buyerEmail,
      buyerNumber,
      ownerEmail,
      ownerNumber,
    }
    fetch("https://pet-adoption-platform-server.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Booking confirmed!");
          handleOpen();
        }
        else{
          toast.error(data.message);
          form.reset();
        }
      });
  }

  return (
      <Dialog open={open}>
        <form onSubmit={handleBooking}>
        <DialogHeader>Booking {name}</DialogHeader>
        <DialogBody>
          <p className="text-[#2D1B69] font-semibold">Booking Information</p>
          <div className="grid lg:grid-cols-2 gap-4 mt-3">
            <Input
              defaultValue={name}
              label="Pet Name"
              readOnly
              variant="outlined"
            />
            <Input
              defaultValue={location}
              label="Pet Location"
              readOnly
              variant="outlined"
            />
            <Input
              defaultValue={price}
              label="Pet Price"
              readOnly
              variant="outlined"
            />
            <Input
              defaultValue={ownerEmail}
              label="Seller Email"
              readOnly
              variant="outlined"
            />
            <Input
              defaultValue={ownerNumber}
              variant="outlined"
              label="Seller Number"
              readOnly
            />
          </div>
          <p className="text-[#2D1B69] font-semibold mt-5">
            Buyer Information
          </p>
          <div className="grid lg:grid-cols-2 gap-4 mt-3">
            <Input defaultValue={user?.email} label="Your Email" readOnly variant="outlined" />
            <Input label="Enter Contact Number" required name="buyerNumber" variant="outlined" />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button className="bg-[#2D1B69]" type="submit">
            <span>Confirm</span>
          </Button>
        </DialogFooter>
        </form>
      </Dialog>
  );
}
