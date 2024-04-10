import { useState } from "react";
import { DriverOption } from "@/app/lib/definitions";
import Image from "next/image";

type OptionProps = {
  options: DriverOption[];
  onSelectDriver: (driver: DriverOption) => void;
};

export default function DriverOptions({
  options,
  onSelectDriver,
}: OptionProps) {
  const [selectedDriver, setSelectedDriver] = useState<DriverOption>();

  const handleRequestDriver = () => {
    if (!selectedDriver) return;

    onSelectDriver(selectedDriver);
  };

  const renderedOptions = options.map((driver, i) => {
    return (
      <li
        key={i}
        className={`flex flex-col transition-all has-[button:hover]:bg-neutrals-800 has-[button:hover]:opacity-80${
          driver === selectedDriver ? " bg-neutrals-800 opacity-80" : ""
        }`}
      >
        <button
          onClick={() => setSelectedDriver(driver)}
          className={`w-full flex gap-4 rounded-lg px-2 py-1 hover:bg-blue-400 ${
            selectedDriver === driver ? "bg-blue-400" : ""
          }`}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
            <Image
              src={"/" + driver.image}
              alt={driver.name}
              width="400"
              height="400"
            />
          </div>
          <div className="flex-1 flex justify-between text-sm">
            <div className="text-start">
              <p className="font-bold text-base mb-1">
                {driver.name}
                {driver.bestMatch && (
                  <span className="ml-3 bg-blue-400 py-0.5 px-1 rounded-sm text-blue-200 text-xs">
                    Best Match
                  </span>
                )}
              </p>
              <p>{driver.car}</p>
            </div>
            <div className="text-end">
              <p className="mb-1">
                {driver.distance}
                <span className="ml-3">⭐️ {driver.rating}</span>
              </p>
              <p>{driver.completedTrips} completed trips</p>
            </div>
          </div>
        </button>
      </li>
    );
  });

  return (
    <>
      <h1 className="tab-heading">Pick your driver</h1>

      <ul className="flex flex-col gap-6 mb-auto">{renderedOptions}</ul>

      <button
        onClick={handleRequestDriver}
        className="text-base font-semibold bg-blue-200 text-blue-900 py-4 w-full rounded-lg"
      >
        Request driver
      </button>
    </>
  );
}
