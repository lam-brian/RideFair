import { useState } from "react";
import { StarIcon as StarActive } from "@heroicons/react/24/solid";
import { StarIcon as Star, ChevronDownIcon } from "@heroicons/react/24/outline";
import visaIcon from "../../assets/visa.svg";

const tipOptions = [
  { text: "$1", value: 1 },
  { text: "$2", value: 2 },
  { text: "$3", value: 3 },
  { text: "No tip", value: 0 },
  { text: "Custom", value: undefined },
];

const Payment = ({ driver, handleSubmitPayment }) => {
  const [stars, setStars] = useState(Array.from({ length: 5 }, () => false));
  const [selectedStar, setSelectedStar] = useState();
  const [review, setReview] = useState("");
  const [tip, setTip] = useState("");

  const highlightStars = (index) => {
    const starsArr = Array.from({ length: 5 }, () => false);

    for (let i = 0; i <= index; i++) {
      starsArr[i] = true;
    }
    setStars(starsArr);
  };

  const handlePayment = () => {
    if (!selectedStar || tip === "") return;

    handleSubmitPayment("$13.64");
  };

  const renderedStars = stars.map((isActive, i) => (
    <button
      onMouseEnter={() => {
        if (selectedStar !== undefined) return;

        highlightStars(i);
      }}
      onMouseLeave={() => {
        if (selectedStar !== undefined) return;

        setStars(Array.from({ length: 5 }, () => false));
      }}
      onClick={() => {
        setSelectedStar(i + 1);
        highlightStars(i);
      }}
      key={i}
      className="w-8 h-8 text-blue-200 mb-4"
    >
      {isActive ? <StarActive /> : <Star />}
    </button>
  ));

  const renderedTipButtons = tipOptions.map((tipOption, i) => (
    <button
      key={i}
      onClick={() => {
        setTip(tipOption.value);
      }}
      className={`border border-neutrals-100 rounded-lg hover:bg-blue-200 hover:text-blue-700 py-2 px-4 ${
        tipOption.text.startsWith("$") ? "col-span-2" : "col-span-3"
      }  ${tip === tipOption.value ? "bg-blue-200 text-blue-700" : ""}`}
    >
      {tipOption.text}
    </button>
  ));

  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
        <img src={driver.image} alt={driver.name} />
      </div>
      <p className="text-white font-bold text-xl mb-4">
        How was your trip with {driver.name.split(" ")[0]}?
      </p>
      <div className="flex gap-4">{renderedStars}</div>
      <input
        value={review}
        onChange={(e) => setReview(e.target.value)}
        type="text"
        className="bg-transparent w-full border border-neutrals-100 rounded-md py-3 px-4 mb-4"
        placeholder="Leave a message (optional)"
      />
      <div className="w-full h-px bg-neutrals-100 mb-4"></div>
      <p className="font-bold text-white self-start text-xl mb-4">Add tip</p>

      <div className="grid grid-cols-6 grid-rows-2 w-full gap-4 mb-4">
        {renderedTipButtons}
      </div>

      <div className="w-full flex gap-2 mb-4">
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
      <div className="w-full h-px bg-neutrals-100 mb-4"></div>
      <div className="flex justify-between w-full text-white mb-4">
        <p>Subtotal</p>
        <p>$12.40</p>
      </div>
      <div className="flex justify-between w-full text-white mb-4">
        <p>Service Fee</p>
        <p>$1.24</p>
      </div>
      <div className="w-full h-px bg-neutrals-100 mb-4"></div>
      <div className="w-full flex justify-between mb-auto">
        <p>Total trip</p>
        <p className="font-bold">$13.64</p>
      </div>

      <button
        onClick={handlePayment}
        className="text-base font-semibold bg-blue-200 text-blue-900 py-4 w-full rounded-lg"
      >
        Submit
      </button>
    </div>
  );
};

export default Payment;
