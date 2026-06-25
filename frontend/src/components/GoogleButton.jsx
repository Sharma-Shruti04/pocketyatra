export default function GoogleButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 border border-gray-300 dark:border-slate-700 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 transition text-gray-700 dark:text-gray-200"
    >
      <img src="logo.png" alt="Google" className="w-5 h-5" />
      <span className="font-medium">Sign in with Google</span>
    </button>
  );
}
