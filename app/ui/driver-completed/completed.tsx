import { CheckCircleIcon } from "@heroicons/react/24/outline";

type CompletedProps = {
  total: number;
  onReset: () => void;
};

export default function Completed({ total, onReset }: CompletedProps) {
  return (
    <div className="flex-1 flex flex-col py-4 px-6 items-center text-neutrals-100">
      <CheckCircleIcon className="w-14 text-blue-300 mb-5" />
      <p className="text-xl mb-4">Payment was successful!</p>
      <div className="text-center border-b border-neutrals-800 w-full pb-4 mb-4">
        <p className="mb-4">
          Total trip: <strong>${total.toFixed(2)}</strong>
        </p>
        <p className="text-sm mb-auto">
          You can view your trip history in your Rides Tab.
        </p>
      </div>
      <button
        onClick={onReset}
        className="button button-primary w-full mt-auto"
      >
        Done
      </button>
    </div>
  );
}
