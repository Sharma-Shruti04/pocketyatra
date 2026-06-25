export default function ActionCard({ title, description }) {
  return (
    <div className="bg-white dark:bg-slate-900/80 p-4 shadow-sm rounded-xl hover:shadow-md transition cursor-pointer border border-transparent dark:border-slate-800">
      <h4 className="font-semibold text-gray-700 dark:text-gray-200">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}
