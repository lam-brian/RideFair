"use client";

import { useState } from "react";
import {
  Ride,
  CarOption,
  DriverOption,
  RideLocations,
} from "../lib/definitions";
import { getCarOptions } from "../lib/server-actions";
import Map from "../ui/map/map";
import SearchDestination from "../ui/map/search-destination";
import Tab from "../ui/tab";
import NavBar from "../ui/nav-bar";
import LoadingOptions from "../ui/options/loading-options";
import CarOptions from "../ui/options/car-options";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";

enum Stages {
  Search,
  CarSelection,
  DriverSelection,
}

const initRideState: Ride = {
  locations: undefined,
  car: undefined,
  driver: undefined,
};

export default function HomePage() {
  const [tabExpanded, setTabExpanded] = useState(false);
  const [stage, setStage] = useState(Stages.Search);
  const [ride, setRide] = useState(initRideState);

  const [rideLocations, setRideLocations] = useState<RideLocations>();
  const [carOptions, setCarOptions] = useState<CarOption[]>([]);
  const [driverOptions, setDriverOptions] = useState<DriverOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabExpand = (state: boolean) => {
    setTabExpanded(state);
  };

  const handleSearch = async (locations: RideLocations) => {
    try {
      setIsLoading(true);
      setTabExpanded(false);
      setRideLocations(locations);
      setRide((state) => ({ ...state, locations }));
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

  const handleSelectCar = (car: CarOption) => {
    setRide((state) => ({ ...state, car }));
  };

  const handleReset = () => {
    setStage(Stages.Search);
    setRide(initRideState);
    setRideLocations(undefined);
    setCarOptions([]);
    setDriverOptions([]);
  };

  let tabContent;

  switch (stage) {
    case Stages.Search:
      tabContent = (
        <>
          <SearchDestination
            isExpanded={tabExpanded}
            expandTab={handleTabExpand}
            onSearch={handleSearch}
          />
          <NavBar />
        </>
      );
      break;

    case Stages.CarSelection:
      tabContent = (
        <CarOptions options={carOptions} onSelectCar={handleSelectCar} />
      );
  }

  return (
    <section className="w-full h-full relative">
      <Map rideLocations={rideLocations} />

      {stage !== Stages.Search && (
        <button
          onClick={handleReset}
          className="absolute left-5 top-5 h-8 w-8 bg-neutrals-800 rounded-full flex items-center justify-center transition-all hover:opacity-80"
        >
          <ChevronLeftIcon className="w-3/5 h-3/5 text-neutrals-100" />
        </button>
      )}

      <Tab
        isExpanded={tabExpanded}
        expandTab={handleTabExpand.bind(null, !tabExpanded)}
      >
        {isLoading ? <LoadingOptions /> : tabContent}
      </Tab>
    </section>
  );
}
