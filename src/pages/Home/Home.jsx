import { useContext, useState } from "react";
import { Web5Context } from "../../store/web5-context";
import Map from "../../components/Map/Map";
import MenuBar from "../../components/MenuBar/MenuBar";
import SearchInput from "../../components/Map/SearchInput";

const Home = () => {
  const web5Ctx = useContext(Web5Context);
  const { user } = web5Ctx;
  const [isExpanded, setIsExpanded] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("My Location");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [submittedLocations, setSubmittedLocations] = useState();

  const handleSearching = (e) => {
    e.preventDefault();
    if (!pickupLocation.trim() || !destinationLocation.trim()) return;
    console.log(pickupLocation.trim(), destinationLocation.trim());

    setSubmittedLocations({
      pickupLocation,
      destinationLocation,
    });
    setIsExpanded(false);
  };

  return (
    <div className="relative text-neutrals-50 h-screen">
      <Map locations={submittedLocations} />
      <div
        className={`absolute z-10 left-0 bottom-0 flex flex-col w-full ${
          isExpanded ? "h-screen" : "h-2/6 min-h-60"
        } bg-blue-900 rounded-t-2xl transition-all`}
      >
        <div
          className="cursor-pointer w-20 h-3 mx-auto mt-3"
          onClick={() => setIsExpanded((state) => !state)}
        >
          <div className="w-20 h-1 bg-white rounded-lg"></div>
        </div>
        <div className="flex-1 p-4 flex flex-col">
          <h1 className="text-2xl mb-3">Hello, {user.firstName}</h1>

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
          <MenuBar />
        </div>
      </div>
    </div>
  );
};

export default Home;
