import { Fragment, useContext } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { AuthContext } from "../context/AuthProvider";

export default function BookingModal({ open, handleOpen, bookingData }) {
  const { name, location, price, ownerEmail, ownerNumber } = bookingData;
  const { user } = useContext(AuthContext);

  return (
    <Fragment>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Booking {name}</DialogHeader>
        <DialogBody>
          <p className="text-purple-400 font-semibold">Booking Information</p>
          <div className="grid lg:grid-cols-2 gap-4 mt-3">
            <Input defaultValue={name} disabled variant="outlined" />
            <Input defaultValue={location} disabled variant="outlined" />
            <Input defaultValue={price} disabled variant="outlined" />
            <Input defaultValue={ownerEmail} disabled variant="outlined" />
            <Input defaultValue={ownerNumber} disabled variant="outlined" />
            <Input defaultValue={user?.email} disabled variant="outlined" />
            <Input
              defaultValue={user?.displayName}
              disabled
              variant="outlined"
            />
          </div>
          <p className="text-purple-400 font-semibold mt-5">Buyer Information</p>
          <div className="grid lg:grid-cols-2 gap-4 mt-3">
            <Input label="Enter Address" variant="outlined" />
            <Input label="Enter Contact Number" variant="outlined" />
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
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
