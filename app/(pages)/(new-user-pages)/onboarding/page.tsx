import Link from "next/link";
import Carousel from "@/app/ui/carousel";
import safeguardImg from "@/app/assets/safeguard-check.svg";
import moneyImg from "@/app/assets/money.svg";
import pointerImg from "@/app/assets/pointer-mouse.svg";

//Feature Array
const FEATURE_CONCEPTS = [
  {
    image: safeguardImg,
    title: "Decentralized ride-sharing.",
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
  return (
    <div className="page-padding h-full flex flex-col justify-end">
      <Carousel slides={FEATURE_CONCEPTS} className="w-full h-4/6 mt-20" />
      <div className="flex flex-col items-center gap-4">
        <Link
          href="/signup"
          className="text-base font-semibold bg-blue-300 text-blue-900 py-4 w-full rounded-lg text-center"
        >
          Sign Up
        </Link>
        <p>
          Have an existing account?{" "}
          <a href="#" className="text-blue-300">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
