import React from "react";
import PetAnimation from "../../animation/pets (1).json";
import  Lottie  from "lottie-react";

const LandingBanner = () => {
  const style = {
    height: 500,
  };
  return (
    <section className="py-10 mx-5 md:flex items-center justify-center h-[60vh]">
      <div className="md:w-1/2">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-pink-500  text-6xl lg:text-8xl font-extrabold">
          Find the Right <br /> Pet For You
        </h1>
        <p className="mt-5 md:text-xl md:font-semibold text-justify">
          "Every human should not buy a dog but rescue in need and free him from
          the sufferings and give him love, care, and shelter." - Ridhima Badola
        </p>
      </div>
      <div className="md:w-1/2">
        <Lottie animationData={PetAnimation} style={style} />
      </div>
    </section>
  );
};

export default LandingBanner;
