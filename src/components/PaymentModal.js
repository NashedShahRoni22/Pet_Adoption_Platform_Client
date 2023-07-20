import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { BsFillCreditCardFill, BsFillLockFill } from "react-icons/bs";

export default function PaymentModal({ open, handleOpen, paymentData, handlePayment }) {
  return (
    <Dialog open={open}>
        <DialogHeader className="text-[#2D1B69]">Payment For {paymentData.name}</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold text-[#2D1B69]"
            >
              Personal Details
            </Typography>
            <Input
              type="email"
              label="Your Email Address"
              defaultValue={paymentData.buyerEmail}
              readOnly
            />
            <Input
              type="email"
              label="Your Phone Number"
              defaultValue={paymentData.buyerNumber}
              readOnly
            />
            <Input
              type="email"
              label="Owner Email Address"
              defaultValue={paymentData.ownerEmail}
              readOnly
            />
            <Input
              type="email"
              label="Owner Phone Number"
              defaultValue={paymentData.ownerNumber}
              readOnly
            />
          </div>

          <div className="my-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-4 font-semibold text-[#2D1B69]"
            >
              Card Details
            </Typography>

            <Input
              label="Card Number"
              maxLength={19} 
              icon={
                <BsFillCreditCardFill className="h-5 w-5 text-blue-gray-300" />
              }
            />
            <div className="my-4 flex items-center gap-4">
              <Input
                label="Expires"
                maxLength={5} 
                containerProps={{ className: "min-w-[72px]" }}
              />
              <Input
                label="CVC"
                maxLength={4} 
                containerProps={{ className: "min-w-[72px]" }}
              />
            </div>
            <Input label="Holder Name"  />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="text"
              color="red"
              size="sm"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button className="bg-[#2D1B69]" size="sm" type="submit" onClick={()=> handlePayment(paymentData)}>
              Pay Now
            </Button>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
          >
            <BsFillLockFill className="-mt-0.5 h-4 w-4" /> Payments are secure
            and encrypted
          </Typography>
        </DialogBody>
    </Dialog>
  );
}
