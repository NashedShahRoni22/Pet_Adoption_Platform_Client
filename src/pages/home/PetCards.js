import React, { useEffect, useState } from "react";
import PetCard from "../../components/PetCard";

const PetCards = () => {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    fetch("pet.json")
      .then((res) => res.json())
      .then((data) => setPets(data));
  }, []);
  return (
    <section className="py-10">
    <h2 className="ml-5 text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-pink-500  text-4xl lg:text-6xl font-extrabold text-center">{pets.length} Pets Available for <br/> Adoption Near You ...</h2>
      <div className="mt-10 gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        {pets.map((pet, i) => (
          <PetCard key={i} pet={pet} />
        ))}
      </div>
    </section>
  );
};

export default PetCards;
