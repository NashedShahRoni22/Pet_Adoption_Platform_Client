import Lottie from "lottie-react";
import React from "react";
import PetAnimation from "../../animation/pets (1).json";

const Home = () => {
  const style = {
    height: 500,
  };
  return (
    // <div className="relative">
    //   <div className="h-full w-full absolute top-0 bg-black/70"></div>
    //   <div className="absolute h-full w-full top-0 flex flex-col justify-center">
    //     <h1 className="ml-5 text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-white  text-6xl lg:text-8xl font-extrabold">
    //       Find the Right <br /> Pet For You
    //     </h1>
    //     <p className="ml-5 mt-5 text-xl font-semibold text-white">
    //       "Every human should not buy a dog but rescue in need and free him from{" "}
    //       <br />
    //       the sufferings and give him love, care, and shelter." - Ridhima Badola
    //     </p>
    //     <Lottie animationData={PetAnimation} style={style} />
    //   </div>
    // </div>
    <section className="py-10 md:flex items-center justify-center h-[60vh]">
      <div className="md:w-1/2">
        <h1 className="ml-5 text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-pink-500  text-6xl lg:text-8xl font-extrabold">
          Find the Right <br /> Pet For You
        </h1>
        <p className="ml-5 mt-5 md:text-xl md:font-semibold text-justify">
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

export default Home;
