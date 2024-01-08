import { useState, useContext } from "react";
import { Web5Context } from "../../store/web5-context";
import SearchInput from "./SearchInput";

const SearchForm = ({ submitLocations, isExpanded, setIsExpanded }) => {
  const web5Ctx = useContext(Web5Context);
  const { user } = web5Ctx;
  const [pickupLocation, setPickupLocation] = useState("My Location");
  const [destinationLocation, setDestinationLocation] = useState("");

  const handleSearching = (e) => {
    e.preventDefault();
    if (!pickupLocation.trim() || !destinationLocation.trim()) return;

    submitLocations({
      pickupLocation,
      destinationLocation,
    });
  };

  return (
    <>
      <h1 className="text-xl mb-3 font-bold">Hello, {user.firstName}</h1>

      <form onSubmit={handleSearching}>
        {isExpanded && (
          <SearchInput
            value={pickupLocation}
            onChange={(e) => {
              setPickupLocation(e.target.value);
            }}
            onClick={() => setIsExpanded(true)}
            isActive={isExpanded}
            label={"Pickup Location"}
          />
        )}

        <SearchInput
          value={destinationLocation}
          onChange={(e) => setDestinationLocation(e.target.value)}
          onClick={() => setIsExpanded(true)}
          isActive={isExpanded}
          label={"Search Location"}
        />

        <button className="invisible pointer-events-none opacity-0">
          Search
        </button>
      </form>

      <ul className="flex flex-col mb-auto">
        <li className="flex-1">
          <button className="w-full flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-white"></div>
            Saved places
          </button>
        </li>
      </ul>
    </>
  );
};

export default SearchForm;
