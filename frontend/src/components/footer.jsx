import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white/70 dark:bg-slate-900/60 border-t border-transparent dark:border-slate-800 mt-0 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary-navy flex items-center justify-center text-white text-sm">PY</div>
          <div>
            <div className="font-medium text-gray-700 dark:text-gray-300">PocketYatra</div>
            <div className="text-xs dark:text-gray-400">Your smart travel companion</div>
          </div>
        </div>
        <div className="text-right">
          <div>Crafted with ❤️ for travelers worldwide</div>
          <div className="text-xs text-gray-400 dark:text-gray-500 font-medium">Powered by AI • Real-time data • Smart recommendations</div>
        </div>
      </div>
    </footer>
  )
}