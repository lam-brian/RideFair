import { useState } from "react";

import Map from "../../components/Map/Map";
import MenuBar from "../../components/MenuBar/MenuBar";
import SearchForm from "../../components/Map/SearchForm";
import Searching from "../../components/Map/Searching";
import RideOptions from "../../components/Map/RideOptions";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const DUMMY_OPTIONS = [
  { type: "Standard", eta: "1:00PM", distance: "3min away", price: "$10.40" },
  {
    type: "Eco-Friendly",
    distance: "3min away",
    price: "$11.40",
  },
  { type: "Carpool", distance: "3min away", price: "$5.40" },
  { type: "Luxury", distance: "3min away", price: "$20.40" },
];

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [submittedLocations, setSubmittedLocations] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [rideOptions, setRideOptions] = useState([]);

  const submitLocations = (locationObj) => {
    setSubmittedLocations(locationObj);
    setIsExpanded(false);
    retrieveRideOptions();
  };

  let tabHeight;

  if (isExpanded) {
    tabHeight = "h-screen";
  } else if (rideOptions.length) {
    tabHeight = "h-3/5";
  } else {
    tabHeight = "h-2/5 min-h-60";
  }

  // Mock for now
  const retrieveRideOptions = async () => {
    try {
      setIsSearching(true);

      const data = await new Promise((res, rej) => {
        setTimeout(() => {
          const options = DUMMY_OPTIONS;
          res(options);
        }, 3000);
      });

      setRideOptions(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    setIsExpanded(false);
    setSubmittedLocations();
    setIsSearching(false);
    setRideOptions([]);
  };

  return (
    <div className="relative text-white h-screen">
      <Map locations={submittedLocations} />
      {!!rideOptions.length && (
        <button
          onClick={handleReset}
          className="absolute left-5 top-5 w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center"
        >
          <ChevronLeftIcon className="w-5 h-5 text-blue-200" />
        </button>
      )}
      <div
        className={`absolute z-10 left-0 bottom-0 flex flex-col w-full ${tabHeight} min-h-60 bg-blue-900 rounded-t-3xl transition-all`}
      >
        <div
          className="cursor-pointer w-20 h-3 mx-auto mt-3"
          onClick={() => setIsExpanded((state) => !state)}
        >
          <div
            className={`w-20 h-1 ${
              isSearching ? "bg-blue-400" : "bg-neutrals-300"
            } rounded-lg`}
          ></div>
        </div>
        <div className="flex-1 p-4 flex flex-col">
          {!rideOptions.length && !isSearching && (
            <SearchForm
              submitLocations={submitLocations}
              isExpanded={isExpanded}
              setIsExpanded={(boolean) => setIsExpanded(boolean)}
            />
          )}
          {isSearching && <Searching />}
          {!!rideOptions.length && <RideOptions options={rideOptions} />}
          {!rideOptions.length && <MenuBar />}
        </div>
      </div>
    </div>
  );
};

export default Home;
