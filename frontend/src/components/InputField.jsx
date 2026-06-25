export default function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-gray-700 dark:text-gray-300 font-medium">{label}</label>
      <input
        type={type}
        name={name}             // ✅ ADD THIS LINE
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>
  );
}
