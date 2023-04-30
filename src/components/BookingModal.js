
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
 
export default function BookingModal({open, handleOpen, bookingData}) {
    const {name, location, price } = bookingData;
    const { user } = useContext(AuthContext);
  
 
  return (
    <Fragment>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Booking {name}</DialogHeader>
        <DialogBody className="grid lg:grid-cols-2 gap-4">
          <Input defaultValue={name} disabled variant="outlined" />
          <Input defaultValue={location} disabled variant="outlined" />
          <Input defaultValue={price} disabled variant="outlined" />
          <Input defaultValue={user.email} disabled variant="outlined" />
          <Input defaultValue={user.displayName} disabled variant="outlined" />
          <Input label="Enter Address" variant="outlined" />
          <Input label="Enter Contact Number" variant="outlined" />
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