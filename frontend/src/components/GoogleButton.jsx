export default function GoogleButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 transition"
    >
      <img src="logo.png" alt="Google" className="w-5 h-5" />
      <span className="text-gray-700 font-medium">Sign in with Google</span>
    </button>
  );
}
