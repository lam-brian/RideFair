import { useState } from "react";

import Map from "../../components/Map/Map";
import MenuBar from "../../components/MenuBar/MenuBar";
import SearchForm from "../../components/Search/SearchForm";
import RideOptions from "../../components/Options/RideOptions";
import DriverOptions from "../../components/Options/DriverOptions";
import Payment from "../../components/FinishedTrip/Payment";
import Receipt from "../../components/FinishedTrip/Receipt";
import Loading from "../../components/General/Loading/Loading";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const delay = (sec) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("Finished");
    }, sec * 1000);
  });
};

const Home = () => {
  const [mapFinishedLoading, setMapFinishedLoading] = useState(false);
  const flowStates = [
    "search",
    "rideOptions",
    "driverOptions",
    "review",
    "receipt",
  ];
  const [activeFlowIndex, setActiveFlowIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [submittedLocations, setSubmittedLocations] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [rideOptions, setRideOptions] = useState([]);
  const [selectedRide, setSelectedRide] = useState();
  const [driverOptions, setDriverOptions] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState();
  const [submittedPayment, setSubmittedPayment] = useState();

  const submitLocations = (locationObj) => {
    setSubmittedLocations(locationObj);
    setIsExpanded(false);
    retrieveRideOptions();
  };

  // Mock for now
  const retrieveRideOptions = async () => {
    try {
      setIsLoading(true);
      await delay(3);
      const res = await fetch("./DATA.json");
      const data = await res.json();

      setRideOptions(data.rideOptions);
      setActiveFlowIndex((state) => ++state);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitRideSelection = (rideSelection) => {
    setSelectedRide(rideSelection);
    retrieveDrivers();
  };

  // Mock for now
  const retrieveDrivers = async () => {
    try {
      setIsLoading(true);
      await delay(2);
      const res = await fetch("./DATA.json");
      const data = await res.json();

      setDriverOptions(data.driverOptions);
      setActiveFlowIndex((state) => ++state);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitDriverSelection = (driverSelection) => {
    setSelectedDriver(driverSelection);
    setActiveFlowIndex((state) => ++state);
    setIsExpanded(true);
  };

  const submitPayment = (payment) => {
    setSubmittedPayment(payment);
    setActiveFlowIndex((state) => ++state);
    setIsExpanded(false);
  };

  const resetStates = () => {
    setActiveFlowIndex(0);
    setIsExpanded(false);
    setSubmittedLocations();
    setIsLoading(false);
    setRideOptions([]);
    setSelectedRide();
    setDriverOptions([]);
    setSelectedDriver();
    setSubmittedPayment();
  };

  let renderedComponent;

  if (flowStates[activeFlowIndex] === "search") {
    renderedComponent = (
      <>
        <SearchForm
          handleLocationSubmit={submitLocations}
          isExpanded={isExpanded}
          handleExpand={(boolean) => setIsExpanded(boolean)}
        />
        <MenuBar />
      </>
    );
  }

  if (flowStates[activeFlowIndex] === "rideOptions") {
    renderedComponent = (
      <RideOptions
        options={rideOptions}
        handleRideSelect={submitRideSelection}
      />
    );
  }

  if (flowStates[activeFlowIndex] === "driverOptions") {
    renderedComponent = (
      <DriverOptions
        options={driverOptions}
        handleDriverSelect={submitDriverSelection}
      />
    );
  }

  if (flowStates[activeFlowIndex] === "review") {
    renderedComponent = (
      <Payment driver={selectedDriver} handleSubmitPayment={submitPayment} />
    );
  }

  if (flowStates[activeFlowIndex] === "receipt") {
    renderedComponent = <Receipt handleReset={resetStates} />;
  }

  let tabHeight;

  if (!mapFinishedLoading) {
    tabHeight = "h-7";
  } else if (isExpanded) {
    tabHeight = "h-screen";
  } else if (flowStates[activeFlowIndex] === "rideOptions" && !isLoading) {
    tabHeight = "h-4/5";
  } else {
    tabHeight = "h-1/2";
  }

  return (
    <div className="relative text-white h-screen">
      <div>Test</div>
      <Map
        isLoaded={mapFinishedLoading}
        locations={submittedLocations}
        handleFinishedLoading={() => {
          setMapFinishedLoading(true);
        }}
      />
      {(flowStates[activeFlowIndex] === "rideOptions" ||
        flowStates[activeFlowIndex] === "driverOptions") && (
        <button
          onClick={resetStates}
          className="absolute left-5 top-5 w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center"
        >
          <ChevronLeftIcon className="w-5 h-5 text-blue-200" />
        </button>
      )}
      <div
        className={`absolute z-10 left-0 bottom-0 flex flex-col w-full ${tabHeight} bg-blue-900 rounded-t-3xl transition-all`}
      >
        <div
          className="cursor-pointer w-20 h-3 mx-auto mt-3"
          onClick={() => {
            if (!mapFinishedLoading) return;
            setIsExpanded((state) => !state);
          }}
        >
          <div
            className={`w-20 h-1 ${
              isLoading ? "bg-blue-800" : "bg-neutrals-300"
            } rounded-lg`}
          ></div>
        </div>
        {mapFinishedLoading && (
          <div className="flex-1 p-4 flex flex-col">
            {isLoading ? <Loading /> : renderedComponent}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
