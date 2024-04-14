"use client";

import { useContext } from "react";
import { Context } from "@/app/lib/store";
import StarIcon from "@heroicons/react/24/solid/StarIcon";

export default function ProfileInfo() {
  const { user, rideHistory } = useContext(Context);

  return (
    <>
      <div className="flex gap-4 mb-8">
        <div className="bg-neutrals-800 w-[75px] h-[75px] rounded-full flex items-center justify-center text-3xl text-blue-300">
          {user?.firstName.slice(0, 1).toUpperCase()}
        </div>

        <div className="flex flex-col flex-1 gap-2">
          <h1 className="text-2xl text-neutrals-100">
            {user?.firstName + " " + user?.lastName}
          </h1>
          <div className="flex gap-1 bg-neutrals-800 text-neutral-300 w-min py-1 px-2 rounded-[50px]">
            <StarIcon className="w-4" /> 5.0
          </div>
        </div>
      </div>

      <div className="flex gap-4 text-neutrals-50">
        <div className="bg-neutrals-800 basis-1/2 flex flex-col items-center gap-4 p-4 rounded-lg">
          <p className="text-2xl font-semibold">2,780</p>
          <p>RideFair Points</p>
        </div>
        <div className="bg-neutrals-800 basis-1/2 flex flex-col items-center gap-4 p-4 rounded-lg">
          <p className="text-2xl font-semibold">
            {rideHistory.length.toString().length === 1 ? "0" : ""}
            {rideHistory.length}
          </p>
          <p>Total Rides</p>
        </div>
      </div>
    </>
  );
}
