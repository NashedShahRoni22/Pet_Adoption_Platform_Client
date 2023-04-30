import React from "react";
import PetCard from "../../components/PetCard";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";

const PetCards = () => {
  

  const { isLoading, error, data:pets } = useQuery({
    queryKey: ["petsData"],
    queryFn: () =>
      fetch("http://localhost:5000/pets").then((res) => res.json()),
  });

  if (isLoading) return <Spinner/>;

  if (error) return "An error has occurred: " + error.message;

  

  return (
    <section className="py-20 bg-blue-100/50 rounded-xl container mx-auto">
      <h2 className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-pink-500  text-2xl md:text-4xl font-extrabold text-center">
        {pets.length} Pets Available for <br /> Adoption!
      </h2>
      <div className="mt-10 mx-5 gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        {pets.map((pet, i) => (
          <PetCard key={i} pet={pet} />
        ))}
      </div>
      
    </section>
  );
};

export default PetCards;
