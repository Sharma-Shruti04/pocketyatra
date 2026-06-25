export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-slate-900/80 shadow rounded-xl p-4 flex flex-col items-center justify-center text-center w-40 border border-transparent dark:border-slate-800">
      <div className="text-3xl mb-1">{icon}</div>
      <h4 className="text-gray-500 dark:text-gray-400 text-sm">{title}</h4>
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{value}</p>
    </div>
  );
}
