import { FormEvent, useState } from "react";
import Image from "next/image";
import { StarIcon as StarActive } from "@heroicons/react/24/solid";
import { StarIcon as Star, ChevronDownIcon } from "@heroicons/react/24/outline";
import visaIcon from "../../assets/visa.svg";
import { DriverOption, Review } from "@/app/lib/definitions";

type ReviewProps = {
  driver: DriverOption;
  onSubmitReview: (review: Review, total: number) => void;
};

const tipOptions = [
  { text: "$1", value: 1 },
  { text: "$2", value: 2 },
  { text: "$3", value: 3 },
  { text: "No tip", value: 0 },
  { text: "Custom", value: 2.5 },
];

export default function ReviewForm({ driver, onSubmitReview }: ReviewProps) {
  const [stars, setStars] = useState(Array.from({ length: 5 }, () => false));
  const [selectedStar, setSelectedStar] = useState<number>();
  const [review, setReview] = useState("");
  const [tip, setTip] = useState(0);

  let subtotal = 10.4;
  let serviceFee = 1.04;

  const highlightStars = (index: number) => {
    const starsArr = Array.from({ length: 5 }, () => false);

    for (let i = 0; i <= index; i++) {
      starsArr[i] = true;
    }
    setStars(starsArr);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!selectedStar) return;

    onSubmitReview(
      {
        rating: selectedStar as 1 | 2 | 3 | 4 | 5,
        review,
        tip,
      },
      subtotal + serviceFee + tip
    );
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
      className="w-8 h-8 text-blue-300"
      type="button"
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
      type="button"
      className={`rounded-lg${
        tipOption.value === tip ? " button-primary" : " bg-neutrals-800"
      } hover:button-primary py-2 px-4 ${
        tipOption.text.startsWith("$") ? "col-span-2" : "col-span-3"
      }`}
    >
      {tipOption.text}
    </button>
  ));

  return (
    <form
      className="flex-1 flex flex-col items-center h-full px-6 py-4"
      onSubmit={handleSubmit}
    >
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
        <Image
          src={"/" + driver.image}
          alt={driver.name}
          width={400}
          height={400}
        />
      </div>
      <p className="text-neutrals-50 font-semibold text-xl mb-4">
        How was your trip with {driver.name.split(" ")[0]}?
      </p>
      <div className="flex gap-4 mb-4">{renderedStars}</div>
      <input
        value={review}
        onChange={(e) => setReview(e.target.value)}
        type="text"
        className="bg-transparent w-full border border-neutrals-500 rounded-md mb-4 p-4"
        placeholder="Leave a message (optional)"
      />

      <div className="flex flex-col gap-4 border-t border-neutrals-800 w-full py-4">
        <p className="font-semibold text-neutrals-50 text-lg">Add tip</p>

        <div className="grid grid-cols-6 grid-rows-2 w-full gap-4">
          {renderedTipButtons}
        </div>

        <div className="w-full flex gap-2">
          <Image src={visaIcon} alt="VISA" />
          <p className="flex items-center gap-1 text-neutrals-100">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            4321
          </p>
          <ChevronDownIcon className="w-6 text-neutrals-300 ml-auto" />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 border-t border-neutrals-800 pt-4 mb-4 text-neutrals-50">
        <div className="w-full flex justify-between">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className="w-full flex justify-between">
          <p>Service Fee</p>
          <p>${serviceFee.toFixed(2)}</p>
        </div>
        <div className="w-full flex justify-between">
          <p>Tip</p>
          <p>${tip.toFixed(2)}</p>
        </div>

        <div className="w-full flex justify-between border-t border-neutrals-800 pt-4">
          <p>Total Trip</p>
          <p>${(subtotal + serviceFee + tip).toFixed(2)}</p>
        </div>
      </div>

      <button className="w-full button button-primary mt-auto" type="submit">
        Submit
      </button>
    </form>
  );
}
