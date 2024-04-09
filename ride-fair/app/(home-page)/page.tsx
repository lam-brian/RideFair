"use client";

import { useState } from "react";
import { CarOption, RideLocations } from "../lib/definitions";
import { getCarOptions } from "../lib/server-actions";
import Map from "../ui/home/map";
import SearchDestination from "../ui/search-destination/search-destination";
import Tab from "../ui/home/tab";
import NavBar from "../ui/nav-bar";
import LoadingOptions from "../ui/loading/loading-options";

enum Stages {
  Search,
  CarSelection,
  DriverSelection,
}

export default function HomePage() {
  const [tabExpanded, setTabExpanded] = useState(false);
  const [stage, setStage] = useState<Stages>(Stages.Search);
  const [rideLocations, setRideLocations] = useState<RideLocations | undefined>(
    undefined
  );
  const [carOptions, setCarOptions] = useState<CarOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabExpand = (state: boolean) => {
    setTabExpanded(state);
  };

  const handleSearch = async (locations: RideLocations) => {
    try {
      setIsLoading(true);
      setTabExpanded(false);
      setRideLocations(locations);
      const options = await getCarOptions(locations);

      if (!options.length) {
        throw new Error("No options found.");
      }

      setCarOptions(options);
      setStage(Stages.CarSelection);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  let tabContent;

  switch (stage) {
    case Stages.Search:
      tabContent = (
        <SearchDestination
          isExpanded={tabExpanded}
          expandTab={handleTabExpand}
          onSearch={handleSearch}
        />
      );
      break;

    case Stages.CarSelection:
  }

  return (
    <section className="w-full h-full relative">
      <Map rideLocations={rideLocations} />

      <Tab
        isExpanded={tabExpanded}
        expandTab={handleTabExpand.bind(null, !tabExpanded)}
      >
        {isLoading ? (
          <LoadingOptions />
        ) : (
          <>
            <div className="px-6 flex-1">{tabContent}</div>
            <NavBar />
          </>
        )}
      </Tab>
    </section>
  );
}
