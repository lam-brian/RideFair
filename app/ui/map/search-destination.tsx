import { useState, useContext, FormEvent, useId } from "react";
import { Context } from "@/app/lib/store";
import { RideLocations } from "@/app/lib/definitions";
import SearchInput from "./search-input";
import { BookmarkIcon } from "@heroicons/react/24/solid";

type PropTypes = {
  isExpanded: boolean;
  expandTab: (state: boolean) => void;
  onSearch: (locations: RideLocations) => void;
};

export default function SearchDestination({
  isExpanded,
  expandTab,
  onSearch,
}: PropTypes) {
  const { user } = useContext(Context);
  const [pickupLocation, setPickupLocation] = useState("My Location");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const sessionId = useId();

  const handleSearching = (e: FormEvent) => {
    e.preventDefault();
    if (!pickupLocation.trim() || !dropOffLocation.trim()) return;

    onSearch({
      pickup: pickupLocation.trim(),
      dropOff: dropOffLocation.trim(),
    });
  };

  const handleInput = async (e: InputEvent) => {
    try {
      const res = await fetch(
        "https://api.mapbox.com/search/searchbox/v1/suggest?" +
          new URLSearchParams({
            q: (e.target as HTMLInputElement).value,
            access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY as string,
            session_token: sessionId,
          })
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-6 flex-1">
      <h1 className="text-xl mb-4 font-semibold">Hello, {user?.firstName}</h1>

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
          value={dropOffLocation}
          onChange={(e) =>
            setDropOffLocation((e.target as HTMLInputElement).value)
          }
          onClick={expandTab.bind(null, true)}
          isActive={isExpanded}
          label={"Search Destination"}
        />

        <button className="hidden pointer-events-none opacity-0">Search</button>
      </form>

      <ul className="flex flex-col mb-4">
        <li className="flex-1">
          <button className="w-full flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-neutrals-800 flex items-center justify-center">
              <BookmarkIcon className="w-5 text-neutrals-300" />
            </div>
            Saved places
          </button>
        </li>
      </ul>
    </div>
  );
}
