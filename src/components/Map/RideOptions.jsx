import carStandard from "../../assets/car-standard.svg";
import carEco from "../../assets/car-eco.svg";
import carCarpool from "../../assets/car-carpool.svg";
import carLuxury from "../../assets/car-luxury.svg";
import visaIcon from "../../assets/visa.svg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const RideOptions = ({ options }) => {
  console.log(options);

  const renderedOptions = options.map((option, i) => {
    let imgSrc;

    switch (option.type) {
      case "Standard":
        imgSrc = carStandard;
        break;
      case "Eco-Friendly":
        imgSrc = carEco;
        break;
      case "Carpool":
        imgSrc = carCarpool;
        break;
      case "Luxury":
        imgSrc = carLuxury;
    }

    return (
      <li key={i} className="flex-1">
        <button className="w-full flex gap-4 rounded-lg px-2 py-1 hover:bg-blue-200">
          <div className="w-12 h-12 flex items-center justify-center">
            <img src={imgSrc} alt={option.type + " Car"} />
          </div>
          <div>
            <p className="font-bold">{option.type}</p>
            <div className="flex items-center gap-1 text-sm">
              <p>{option.distance}</p>
            </div>
          </div>
          <p className="ml-auto font-bold">{option.price}</p>
        </button>
      </li>
    );
  });

  return (
    <>
      <h1 className="self-center text-xl mb-8 font-bold">
        Choose your ride option
      </h1>

      <ul className="flex flex-col gap-6 mb-6">{renderedOptions}</ul>
      <div className="w-full h-px bg-neutrals-100 mb-6"></div>
      <div className="flex gap-2 mb-auto">
        <img src={visaIcon} alt="VISA" />
        <p className="flex items-center gap-1">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          4321
        </p>
        <ChevronDownIcon className="w-5 ml-auto" />
      </div>
      <button className="text-base font-semibold bg-blue-200 text-blue-900 py-4 w-full rounded-lg">
        Confirm standard ride
      </button>
    </>
  );
};

export default RideOptions;
