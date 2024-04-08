"use client";

import { useState } from "react";
import { RideLocations } from "../lib/definitions";
import Map from "../ui/home/map";
import SearchDestination from "../ui/home/search-destination/search-destination";
import Tab from "../ui/home/tab";
import NavBar from "../ui/nav-bar";

enum Stages {
  Search,
  RideSelection,
  DriverSelection,
}

export default function HomePage() {
  const [tabExpanded, setTabExpanded] = useState(false);
  const [stage, setStage] = useState<Stages>(Stages.Search);
  const [rideLocations, setRideLocations] = useState<RideLocations | undefined>(
    undefined
  );

  const handleTabExpand = (state: boolean) => {
    setTabExpanded(state);
  };

  const handleSearch = async (locations: RideLocations) => {
    try {
      setRideLocations(locations);
      setTabExpanded(false);
    } catch (err) {}
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
  }

  return (
    <section className="w-full h-full relative">
      <Map rideLocations={rideLocations} />

      <Tab
        isExpanded={tabExpanded}
        expandTab={handleTabExpand.bind(null, !tabExpanded)}
      >
        <div className="px-6 flex-1">{tabContent}</div>
        <NavBar />
      </Tab>
    </section>
  );
}
