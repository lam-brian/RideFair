import { useState } from "react";

const DriverOptions = ({ drivers, selectDriver }) => {
  const [selectedDriver, setSelectedDriver] = useState();

  const handleRequestDriver = () => {
    if (!selectedDriver) return;

    selectDriver(selectedDriver);
  };

  const renderedOptions = drivers.map((driver, i) => {
    return (
      <li key={i} className="flex-1">
        <button
          onClick={() => setSelectedDriver(driver)}
          className={`w-full flex gap-4 rounded-lg px-2 py-1 hover:bg-blue-400 ${
            selectedDriver === driver ? "bg-blue-400" : ""
          }`}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
            <img src={driver.image} alt={driver.name} />
          </div>
          <div className="flex-1 flex justify-between text-sm">
            <div className="text-start">
              <p className="font-bold text-base mb-1">
                {driver.name}
                {driver.bestMatch && (
                  <span className="ml-3 bg-blue-400 py-0.5 px-1 rounded-sm text-blue-200 text-xs">
                    Best Match
                  </span>
                )}
              </p>
              <p>{driver.car}</p>
            </div>
            <div className="text-end">
              <p className="mb-1">
                {driver.distance}
                <span className="ml-3">⭐️ {driver.rating}</span>
              </p>
              <p>{driver.completedTrips} completed trips</p>
            </div>
          </div>
        </button>
      </li>
    );
  });

  return (
    <>
      <h1 className="self-center text-xl mb-3 font-bold">Pick your driver</h1>

      <ul className="flex flex-col gap-6 mb-auto">{renderedOptions}</ul>

      <button
        onClick={handleRequestDriver}
        className="text-base font-semibold bg-blue-200 text-blue-900 py-4 w-full rounded-lg"
      >
        Request driver
      </button>
    </>
  );
};

export default DriverOptions;
