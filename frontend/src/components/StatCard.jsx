export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center justify-center text-center w-40">
      <div className="text-3xl mb-1">{icon}</div>
      <h4 className="text-gray-500 text-sm">{title}</h4>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
