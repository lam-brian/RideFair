import { useState } from "react";
import { DriverFilters, DriverOption } from "@/app/lib/definitions";
import Image from "next/image";
import InfoIcon from "@heroicons/react/24/solid/InformationCircleIcon";
import SortIcon from "@heroicons/react/24/solid/AdjustmentsHorizontalIcon";
import StarIcon from "@heroicons/react/24/solid/StarIcon";

type OptionProps = {
  options: DriverOption[];
  expandTab: (state: boolean) => void;
  onSelectDriver: (driver: DriverOption) => void;
};

const initFilter: DriverFilters = {
  ratingLimit: 0,
  genderLimit: false,
};

export default function DriverOptions({
  options,
  expandTab,
  onSelectDriver,
}: OptionProps) {
  const [selectedDriver, setSelectedDriver] = useState<DriverOption>();
  const [filters, setFilters] = useState(initFilter);
  const [showFilter, setShowFilter] = useState(false);

  const handleRequestDriver = () => {
    if (!selectedDriver) return;

    onSelectDriver(selectedDriver);
  };

  const handleShowFilters = () => {
    expandTab(true);
    setShowFilter(true);
  };

  const renderedOptions = options.map((driver, i, arr) => {
    return (
      <li
        key={i}
        className={`flex flex-col transition-all has-[button:hover]:bg-neutrals-800 has-[button:hover]:opacity-80${
          driver === selectedDriver ? " bg-neutrals-800 opacity-80" : ""
        }`}
      >
        <button
          onClick={() => setSelectedDriver(driver)}
          className={`flex gap-4 mx-6 py-4 text-neutrals-50 border-neutrals-800${
            i < arr.length - 1 ? " border-b" : ""
          }`}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={"/" + driver.image}
              alt={driver.name}
              width="400"
              height="400"
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="flex gap-1 text-neutrals-50 font-semibold h-full">
              {driver.name}
              <span className="flex gap-1 text-neutrals-100 h-full">
                <StarIcon className="inline-block w-4 text-neutrals-300" />
                {driver.rating}
              </span>
            </p>

            <p className="text-neutrals-100">
              {driver.distance}, {driver.car}
            </p>
          </div>
        </button>
      </li>
    );
  });

  if (showFilter) {
    return (
      <>
        <h1>Filters</h1>
      </>
    );
  }

  return (
    <>
      <h1 className="tab-heading" style={{ marginBottom: "4px" }}>
        Driver Matches
      </h1>
      <p className="text-neutrals-100 mx-6 mb-4">
        Based on your preferences, these are your possible drivers that we’ll be
        sharing your data with.
        <span className="ml-1">
          <InfoIcon className="inline-block w-[1.2rem] text-neutrals-300" />
        </span>
      </p>

      <ul className="border-t border-neutrals-800 mb-4">
        <button
          className="flex items-center gap-2 border border-neutrals-300 rounded-3xl mx-6 my-4 py-1 px-4 text-neutrals-100 transition-all hover:opacity-60"
          onClick={handleShowFilters}
        >
          Filter
          <SortIcon className="w-4" />
        </button>
        {renderedOptions}
      </ul>

      <button
        onClick={handleRequestDriver}
        className="button button-primary mx-6 mb-4 mt-auto"
      >
        Request driver
      </button>
    </>
  );
}
