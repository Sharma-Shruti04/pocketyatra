export default function TripCard({ name, location, date, budget }) {
  return (
    <div className="bg-white dark:bg-slate-900/80 shadow-sm rounded-xl p-4 flex justify-between items-center border border-transparent dark:border-slate-800">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{location} • {date}</p>
      </div>
      <p className="font-semibold text-blue-600 dark:text-blue-400">₹{budget}</p>
    </div>
  );
}
