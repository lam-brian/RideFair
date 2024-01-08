import { CheckCircleIcon } from "@heroicons/react/24/outline";

const Payment = ({ handleReset }) => {
  return (
    <div className="flex flex-col items-center text-white">
      <CheckCircleIcon className="w-14 text-blue-200 mb-4" />
      <p className="font-bold text-xl mb-5">Payment was successful!</p>
      <p className="mb-4">
        Total trip: <strong>$13.64</strong>
      </p>
      <p className="text-sm mb-4">
        You can view your trip history in your Activity.
      </p>
      <div className="w-full h-px bg-neutrals-100 mb-4"></div>
      <button
        onClick={handleReset}
        className="text-base font-semibold bg-blue-200 text-blue-900 py-4 w-full rounded-lg"
      >
        {" "}
        Done
      </button>
    </div>
  );
};

export default Payment;
