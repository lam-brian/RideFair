import { useState, useContext, FormEvent } from "react";
import { Context } from "@/app/lib/store";
import SearchInput from "./search-input";
import { BookmarkIcon } from "@heroicons/react/24/solid";

type PropTypes = {
  isExpanded: boolean;
  expandTab: (state: boolean) => void;
};

export default function SearchForm({ isExpanded, expandTab }: PropTypes) {
  const { user } = useContext(Context);
  const [pickupLocation, setPickupLocation] = useState("My Location");
  const [destinationLocation, setDestinationLocation] = useState("");

  const handleSearching = (e: FormEvent) => {
    e.preventDefault();
    if (!pickupLocation.trim() || !destinationLocation.trim()) return;

    // handleLocationSubmit({
    //   pickupLocation,
    //   destinationLocation,
    // });
  };

  return (
    <>
      <h1 className="text-[1.5em] mb-4 font-semibold">
        Hello, {user?.firstName}
      </h1>

      <form onSubmit={handleSearching}>
        {isExpanded && (
          <SearchInput
            value={pickupLocation}
            onChange={(e) => {
              setPickupLocation((e.target as HTMLInputElement).value);
            }}
            onClick={expandTab.bind(null, true)}
            isActive={isExpanded}
            label={"Pickup Location"}
          />
        )}

        <SearchInput
          value={destinationLocation}
          onChange={(e) =>
            setDestinationLocation((e.target as HTMLInputElement).value)
          }
          onClick={expandTab.bind(null, true)}
          isActive={isExpanded}
          label={"Search Destination"}
        />

        <button className="invisible pointer-events-none opacity-0">
          Search
        </button>
      </form>

      <ul className="flex flex-col mb-auto">
        <li className="flex-1">
          <button className="w-full flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-neutrals-500 flex items-center justify-center">
              <BookmarkIcon className="w-5 text-neutrals-100" />
            </div>
            Saved places
          </button>
        </li>
      </ul>
    </>
  );
}
