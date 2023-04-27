import { Button, Input, Textarea } from "@material-tailwind/react";
import React from "react";
import ContactAnim from "../../animation/pets (2).json";
import Lottie from "lottie-react";

const Contact = () => {
  const style = {
    height: 400,
  };
  return (
    <div className="pt-20">
      <h1 className="text-center mt-10 md:mt-0 text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-pink-500  text-2xl md:text-4xl font-extrabold">
        Contact us!
      </h1>
      <div className="md:flex my-10 items-center">
        <div className="md:w-1/2">
          <Lottie animationData={ContactAnim} style={style} />
        </div>
        <form className="w-full md:w-1/2 flex flex-col gap-6 p-5 shadow-xl">
          <Input variant="standard" label="Enter Name" />
          <Input variant="standard" label="Enter Email" />
          <Textarea variant="standard" label="Enter Message" />
          <Button>Send</Button>
        </form>
      </div>
      <p className="py-5 text-center bg-gradient-to-tr from-blue-400 to-purple-400 font-semibold text-white">Copyright Reserved by Pet Adoption Platform 2023</p>
    </div>
  );
};

export default Contact;
