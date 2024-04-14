"use client";

import { useState, useContext } from "react";
import { Context } from "../lib/store";
import {
  Ride,
  CarOption,
  DriverOption,
  RideLocations,
  Review,
} from "../lib/definitions";
import { getCarOptions, getDriverOptions } from "../lib/server-actions";
import Map from "../ui/map/map";
import SearchDestination from "../ui/map/search-destination";
import Tab from "../ui/tab";
import NavBar from "../ui/nav-bar";
import LoadingOptions from "../ui/options/loading-options";
import CarOptions from "../ui/options/car-options";
import DriverOptions from "../ui/options/driver-options";
import ReviewForm from "../ui/driver-completed/review-form";
import Completed from "../ui/driver-completed/completed";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";

enum Stages {
  Search,
  CarSelection,
  DriverSelection,
  Review,
  Completion,
}

const initRideState: Ride = {
  id: Math.random(),
  locations: undefined,
  car: undefined,
  driver: undefined,
  review: undefined,
  total: undefined,
  timestamp: undefined,
};

export default function HomePage() {
  const ctx = useContext(Context);

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

  const handleSelectCar = async (car: CarOption) => {
    try {
      setIsLoading(true);
      setRide((state) => ({ ...state, car }));
      const options = await getDriverOptions(car);

      if (!options.length) {
        throw new Error("no options found.");
      }

      setDriverOptions(options);
      setStage(Stages.DriverSelection);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDriver = async (driver: DriverOption) => {
    try {
      console.log(driver);
      setRide((state) => ({ ...state, driver }));
      setStage(Stages.Review);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitReview = (review: Review, total: number) => {
    const timestamp = new Date().toISOString();

    setRide((state) => ({ ...state, review, total, timestamp }));
    ctx.addRideToHistory({ ...ride, review, total, timestamp });
    setStage(Stages.Completion);
  };

  const handleReset = () => {
    setStage(Stages.Search);
    setRide(initRideState);
    setRideLocations(undefined);
    setCarOptions([]);
    setDriverOptions([]);
    setTabExpanded(false);
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
      break;

    case Stages.DriverSelection:
      tabContent = (
        <DriverOptions
          options={driverOptions}
          onSelectDriver={handleSelectDriver}
        />
      );
      break;

    case Stages.Review:
      tabContent = (
        <ReviewForm driver={ride.driver!} onSubmitReview={handleSubmitReview} />
      );
      break;

    case Stages.Completion:
      tabContent = <Completed onReset={handleReset} total={ride.total!} />;
      break;

    default:
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
  }

  return (
    <section className="w-full h-full relative">
      <Map rideLocations={rideLocations} />

      {(stage === Stages.CarSelection || stage === Stages.DriverSelection) && (
        <button
          onClick={handleReset}
          className="absolute left-5 top-5 h-8 w-8 bg-neutrals-800 rounded-full flex items-center justify-center transition-all hover:opacity-80"
          aria-label="go back"
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
