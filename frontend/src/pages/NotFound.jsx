import React from "react";
import { Link } from "react-router-dom";
import { FaCompass, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-10 max-w-lg w-full shadow-2xl border border-white/20 dark:border-slate-800/50 text-center relative overflow-hidden transition-all duration-300">
        {/* Glow circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/30 dark:bg-indigo-950/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-100/30 dark:bg-purple-950/20 rounded-full blur-xl"></div>

        <div className="relative z-10 space-y-6">
          {/* Compass Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg text-white mb-4 animate-pulse">
            <FaCompass className="text-5xl animate-[spin_10s_linear_infinite]" />
          </div>

          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            404 - Lost in Transit
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            Oops! The destination you are searching for does not exist, or has been moved to another coordinate. Let's get you back on track!
          </p>

          {/* Action Button */}
          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3.5 rounded-xl font-bold hover:from-blue-650 hover:to-purple-700 hover:scale-[1.03] transform transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            >
              <FaArrowLeft className="text-sm" /> Return to Safe Harbor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
