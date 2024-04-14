import RideHistory from "@/app/ui/ride-history/ride-history";

export default function MyRidesPage() {
  return (
    <>
      <h1 className="mb-8 text-2xl text-neutrals-50 font-semibold">Rides</h1>

      <h2 className="text-lg mb-4">Upcoming Rides</h2>
      <p className="bg-neutrals-800 text-neutrals-100 w-full text-lg mb-8 py-3 px-4 rounded-lg">
        You have no upcoming rides
      </p>

      <h2 className="text-lg mb-4">Previous Rides</h2>
      <RideHistory />
    </>
  );
}
