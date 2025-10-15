export default function TripCard({ name, location, date, budget }) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-500 text-sm">{location} • {date}</p>
      </div>
      <p className="font-semibold text-blue-600">₹{budget}</p>
    </div>
  );
}
