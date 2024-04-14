import { useState } from "react";
import Image from "next/image";
import { CarOption } from "@/app/lib/definitions";
import carStandard from "../../assets/car-standard.svg";
import carEco from "../../assets/car-eco.svg";
import carCarpool from "../../assets/car-carpool.svg";
import carLuxury from "../../assets/car-luxury.svg";
import visaIcon from "../../assets/visa.svg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type OptionProps = {
  options: CarOption[];
  onSelectCar: (car: CarOption) => void;
};

export default function CarOptions({ options, onSelectCar }: OptionProps) {
  const [selectedCar, setSelectedCar] = useState<CarOption>();

  const handleConfirmRide = () => {
    if (!selectedCar) return;

    onSelectCar(selectedCar);
  };

  const renderedOptions = options.map((option, i, arr) => {
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
      <li
        key={i}
        className={`flex flex-col transition-all has-[button:hover]:bg-neutrals-800 has-[button:hover]:opacity-80${
          option === selectedCar ? " bg-neutrals-800 opacity-80" : ""
        }`}
      >
        <button
          onClick={() => setSelectedCar(option)}
          className={`flex gap-6 mx-6 py-4 text-neutrals-50 border-neutrals-800${
            i < arr.length - 1 ? " border-b" : ""
          }`}
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <Image
              src={imgSrc}
              alt={option.type + " Car"}
              className="scale-125"
            />
          </div>
          <div className="text-left">
            <p className="font-semibold">{option.type}</p>
            <div className="flex items-center gap-1 text-sm text-neutrals-100">
              <p>{option.distance}</p>
            </div>
          </div>
          <p className="ml-auto font-semibold">{option.price}</p>
        </button>
      </li>
    );
  });

  return (
    <>
      <h1 className="px-6 text-xl text-neutrals-50 mb-4 font-semibold">
        Choose your ride option
      </h1>

      <ul className="border-t border-b border-neutrals-800 mb-4">
        {renderedOptions}
      </ul>
      <div className="flex gap-2 mx-6 mb-4">
        <Image src={visaIcon} alt="VISA" />
        <p className="flex items-center gap-1 text-neutrals-100">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          4321
        </p>
        <ChevronDownIcon className="w-6 ml-auto text-neutrals-300" />
      </div>
      <button
        onClick={handleConfirmRide}
        className="button button-primary mx-6 mb-4 mt-auto"
      >
        Confirm ride
      </button>
    </>
  );
}
