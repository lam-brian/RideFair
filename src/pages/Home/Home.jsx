import { useState } from "react";

import Map from "../../components/Map/Map";
import MenuBar from "../../components/MenuBar/MenuBar";
import SearchForm from "../../components/Map/SearchForm";
import Searching from "../../components/Map/Searching";
import RideOptions from "../../components/Map/RideOptions";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import driverDavid from "../../assets/driver-david.png";
import driverJohn from "../../assets/driver-john.jpeg";
import driverRachel from "../../assets/driver-rachel.png";
import DriverOptions from "../../components/Map/DriverOptions";
import FinishedTrip from "../../components/Map/FinishedTrip";
import Payment from "../../components/Map/Payment";

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

const DUMMY_DRIVERS = [
  {
    name: "David D.",
    image: driverDavid,
    car: "Silver BMW X5",
    distance: "2 mins away",
    rating: "4.9",
    completedTrips: 220,
    bestMatch: true,
  },
  {
    name: "Rachel R.",
    image: driverRachel,
    car: "White Honda Accord",
    distance: "7 mins away",
    rating: "4.9",
    completedTrips: 140,
    bestMatch: false,
  },
  {
    name: "John J.",
    image: driverJohn,
    car: "Red Toyota Camry",
    distance: "10 mins away",
    rating: "4.9",
    completedTrips: 100,
    bestMatch: false,
  },
];

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [submittedLocations, setSubmittedLocations] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [rideOptions, setRideOptions] = useState([]);
  const [selectedRide, setSelectedRide] = useState();
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState();
  const [payment, setPayment] = useState();
  const [mapFinishedLoading, setMapFinishedLoading] = useState(false);

  const submitLocations = (locationObj) => {
    setSubmittedLocations(locationObj);
    setIsExpanded(false);
    retrieveRideOptions();
  };

  let tabHeight;

  if (!mapFinishedLoading) {
    tabHeight = "h-7";
  } else {
    if (isExpanded) {
      tabHeight = "h-screen";
    } else if (rideOptions.length && !drivers.length) {
      tabHeight = "h-4/5";
    } else {
      tabHeight = "h-1/2";
    }
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

  // Mock for now
  const retrieveDrivers = async () => {
    try {
      const data = await new Promise((res, rej) => {
        const drivers = DUMMY_DRIVERS;
        res(drivers);
      });

      setDrivers(data);
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
    setSelectedRide();
    setDrivers([]);
    setSelectedDriver();
    setPayment();
  };

  return (
    <div className="relative text-white h-screen">
      <Map
        isFinished={mapFinishedLoading}
        locations={submittedLocations}
        handleFinishedLoading={() => {
          setMapFinishedLoading(true);
        }}
      />
      {(!!rideOptions.length || !!drivers.length) && (
        <button
          onClick={handleReset}
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
              isSearching ? "bg-blue-800" : "bg-neutrals-300"
            } rounded-lg`}
          ></div>
        </div>
        {mapFinishedLoading && (
          <div className="flex-1 p-4 flex flex-col">
            {!drivers.length && !rideOptions.length && !isSearching && (
              <SearchForm
                submitLocations={submitLocations}
                isExpanded={isExpanded}
                setIsExpanded={(boolean) => setIsExpanded(boolean)}
              />
            )}
            {isSearching && <Searching />}
            {!drivers.length && !!rideOptions.length && (
              <RideOptions
                options={rideOptions}
                handleSelectRide={(ride) => {
                  setSelectedRide(ride);
                  retrieveDrivers();
                }}
              />
            )}
            {!selectedDriver && !!drivers.length && (
              <DriverOptions
                drivers={drivers}
                selectDriver={(driver) => {
                  console.log(driver);
                  setSelectedDriver(driver);
                  setIsExpanded(true);
                }}
              />
            )}
            {!payment && selectedDriver && (
              <FinishedTrip
                driver={selectedDriver}
                handlePayment={(payment) => {
                  setIsExpanded(false);
                  setPayment(payment);
                }}
              />
            )}
            {payment && <Payment handleReset={handleReset} />}
            {!drivers.length && !rideOptions.length && <MenuBar />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
