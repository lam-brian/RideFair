import { useState } from "react";
import { NavLink } from "react-router-dom";
import safeguardImg from "/src/assets/safeguard-check.svg";
import moneyImg from "/src/assets/money.svg";
import pointerImg from "/src/assets/pointer-mouse.svg";

//Feature Array
export const FEATURE_CONCEPTS = [
  {
    image: safeguardImg,
    title: "Decentralized ride-sharing",
    description:
      "The only ride-share app that won’t sell your private information.",
  },
  {
    image: pointerImg,
    title: "Your ride, your choice.",
    description:
      "Choose your driver from a short list based on your needs and preferences.",
  },
  {
    image: moneyImg,
    title: "Escape high fees!",
    description:
      "We charge 10%, not 25-30% like Uber & Lyft. A win-win for you and your driver.",
  },
];

const Onboarding = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % FEATURE_CONCEPTS.length);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-900 px-6">
      <img className="mb-8" src={FEATURE_CONCEPTS[currentPage].image} />
      <h1 className="text-2xl font-semibold text-neutrals-50 mb-4">
        {FEATURE_CONCEPTS[currentPage].title}
      </h1>
      <p className="text-base text-neutrals-100 text-center mb-4">
        {FEATURE_CONCEPTS[currentPage].description}
      </p>

      {/* Nav Dots */}
      <div className="flex mt-4 mb-8">
        {FEATURE_CONCEPTS.map((_, index) => (
          <div
            key={index}
            className={`${
              currentPage === index
                ? "w-8 h-3 rounded-full bg-blue-200 mx-2"
                : "w-3 h-3 rounded-full bg-blue-400 mx-2"
            } cursor-pointer`}
            onClick={() => setCurrentPage(index)}
          ></div>
        ))}
      </div>

      <NavLink
        to={"/signup"}
        className="text-base font-semibold bg-blue-200 text-blue-900 py-4 mt-8 w-full rounded-lg text-center"
        onClick={() => console.log("Sign Up Clicked")}
      >
        Sign Up
      </NavLink>
    </div>
  );
};

export default Onboarding;
