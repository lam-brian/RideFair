import { useState } from "react";

import Map from "../../components/Map/Map";
import MenuBar from "../../components/MenuBar/MenuBar";
import SearchForm from "../../components/Map/SearchForm";

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [submittedLocations, setSubmittedLocations] = useState();

  const submitLocations = (locationObj) => {
    setSubmittedLocations(locationObj);
    setIsExpanded(false);
  };

  return (
    <div className="relative text-neutrals-50 h-screen">
      <Map locations={submittedLocations} />
      <div
        className={`absolute z-10 left-0 bottom-0 flex flex-col w-full ${
          isExpanded ? "h-screen" : "h-2/5 min-h-60"
        } bg-blue-900 rounded-t-2xl transition-all`}
      >
        <div
          className="cursor-pointer w-20 h-3 mx-auto mt-3"
          onClick={() => setIsExpanded((state) => !state)}
        >
          <div className="w-20 h-1 bg-white rounded-lg"></div>
        </div>
        <div className="flex-1 p-4 flex flex-col">
          <SearchForm
            submitLocations={submitLocations}
            isExpanded={isExpanded}
            setIsExpanded={(boolean) => setIsExpanded(boolean)}
          />
          <MenuBar />
        </div>
      </div>
    </div>
  );
};

export default Home;
