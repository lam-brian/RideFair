"use client";

import { useContext } from "react";
import { Context } from "../../lib/store";

export default function RideHistory() {
  const { rideHistory } = useContext(Context);

  const renderedRides = rideHistory.map((ride) => {
    const dateObj = new Date(ride.timestamp!);

    const date = dateObj.toLocaleDateString("en-us", {
      month: "short",
      day: "2-digit",
    });
    const time = dateObj.toLocaleTimeString("en-us", {
      timeStyle: "short",
    });

    return (
      <li
        key={ride.id}
        className="flex justify-between flex-col gap-1 bg-neutrals-800 text-neutrals-50 w-full py-3 px-4 rounded-lg"
      >
        <div className="flex gap-4 w-full">
          <p className="text-ellipsis text-nowrap overflow-hidden">
            {ride.locations?.dropOff}
          </p>
          <p>${ride.total?.toFixed(2)}</p>
        </div>
        <p className="text-neutrals-100 basis-full text-sm flex items-center gap-1.5">
          {date} <span className="dot inline-block" /> {time}{" "}
        </p>
      </li>
    );
  });

  if (!rideHistory.length) {
    return (
      <p className="bg-neutrals-800 text-neutrals-100 w-full text-lg mb-8 py-3 px-4 rounded-lg">
        You have no previous rides
      </p>
    );
  }

  return <ul className="flex flex-col gap-6">{renderedRides}</ul>;
}
