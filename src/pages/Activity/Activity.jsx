import MenuBar from "../../components/MenuBar/MenuBar";

const Activity = () => {
  return (
    <div className="flex flex-col w-full h-screen bg-blue-900 text-white p-4">
      <h1 className="font-bold text-3xl mb-14">Rides</h1>
      <h2 className="font-bold text-xl mb-4">Upcoming Rides</h2>
      <div className="w-full bg-blue-800 p-8 flex items-center justify-center rounded-lg mb-12">
        <p className="text-xl">You have no upcoming rides</p>
      </div>
      <h2 className="font-bold text-xl mb-4">Previous Rides</h2>
      <div className="bg-blue-800 p-3 mb-4 rounded-lg">
        <div className="flex justify-between font-bold mb-1">
          <p>2855 Stevens Creek Blvd</p>
          <p>$10.40</p>
        </div>
        <div className="text-sm flex items-center gap-1.5">
          <p>Jan 09</p>
          <div className="w-1.5 h-1.5 rounded-full bg-neutrals-300"></div>
          <p>10:07 PM</p>
        </div>
      </div>
      <div className="bg-blue-800 p-3 mb-auto rounded-lg">
        <div className="flex justify-between font-bold mb-1">
          <p>950 Mason St, San Francisco...</p>
          <p>$17.40</p>
        </div>
        <div className="text-sm flex items-center gap-1.5">
          <p>Dec 24</p>
          <div className="w-1.5 h-1.5 rounded-full bg-neutrals-300"></div>
          <p>11:39 PM</p>
        </div>
      </div>
      <MenuBar />
    </div>
  );
};

export default Activity;
