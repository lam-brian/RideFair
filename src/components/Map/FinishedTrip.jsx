import { StarIcon as StarActive } from "@heroicons/react/24/solid";
import { StarIcon as Star, ChevronDownIcon } from "@heroicons/react/24/outline";
import visaIcon from "../../assets/visa.svg";
import { useState } from "react";

const FinishedTrip = ({ driver, handlePayment }) => {
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

  const handlePaymentSubmit = () => {
    if (!selectedStar || tip === "") return;

    handlePayment("$13.64");
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
        setSelectedStar(i);
        highlightStars(i);
      }}
      key={i}
      className="w-8 h-8 text-blue-200 mb-4"
    >
      {isActive ? <StarActive /> : <Star />}
    </button>
  ));

  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
        <img src={driver.image} alt={driver.name} />
      </div>
      <p className="text-white font-bold text-xl mb-4">
        How was your trip with David?
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
        <button
          onClick={() => {
            setTip(1);
          }}
          className={`border border-neutrals-100 rounded-lg hover:bg-blue-200 hover:text-blue-700 py-2 px-4 col-span-2 ${
            tip === 1 ? "bg-blue-200 text-blue-700" : ""
          }`}
        >
          $1
        </button>
        <button
          onClick={() => {
            setTip(2);
          }}
          className={`border border-neutrals-100 rounded-lg hover:bg-blue-200 hover:text-blue-700 py-2 px-4 col-span-2 ${
            tip === 2 ? "bg-blue-200 text-blue-700" : ""
          }`}
        >
          $2
        </button>
        <button
          onClick={() => {
            setTip(3);
          }}
          className={`border border-neutrals-100 rounded-lg hover:bg-blue-200 hover:text-blue-700 py-2 px-4 col-span-2 ${
            tip === 3 ? "bg-blue-200 text-blue-700" : ""
          }`}
        >
          $3
        </button>
        <button
          onClick={() => {
            setTip(0);
          }}
          className={`border border-neutrals-100 rounded-lg hover:bg-blue-200 hover:text-blue-700 py-2 px-4 col-span-3 ${
            tip === 0 ? "bg-blue-200 text-blue-700" : ""
          }`}
        >
          No tip
        </button>
        <button
          onClick={() => {
            setTip("custom");
          }}
          className={`border border-neutrals-100 rounded-lg hover:bg-blue-200 hover:text-blue-700 py-2 px-4 col-span-3 ${
            tip === "custom" ? "bg-blue-200 text-blue-700" : ""
          }`}
        >
          Custom
        </button>
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
        onClick={handlePaymentSubmit}
        className="text-base font-semibold bg-blue-200 text-blue-900 py-4 w-full rounded-lg"
      >
        Submit
      </button>
    </div>
  );
};

export default FinishedTrip;
