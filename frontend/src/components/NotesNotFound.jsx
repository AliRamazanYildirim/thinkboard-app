import { Link } from "react-router";

const NotesNotFound = () => (
    <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center">
            {/* Notebook Icon with Creative Shadow */}
            <div className="mb-8 flex items-center justify-center relative">
                {/* Outer glow circle */}
                <div className="absolute w-24 h-24 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
                
                {/* Middle shadow circle */}
                <div className="absolute w-20 h-20 bg-green-500/30 rounded-full blur-lg"></div>
                
                {/* Main background circle */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-500/30 shadow-lg shadow-green-500/25">
                    <svg
                        className="w-8 h-8 text-green-400 drop-shadow-lg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <defs>
                            <linearGradient id="noteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#22c55e" />
                            </linearGradient>
                        </defs>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2m14 0H5m14 0h-3M5 21h3m0 0v-3M5 18v3m3-3h8"
                            stroke="url(#noteGradient)"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 9h6m-6 4h6"
                            stroke="url(#noteGradient)"
                        />
                    </svg>
                </div>
            </div>

            <h1 className="text-2xl font-semibold text-white mb-4">
                No notes yet
            </h1>

            {/* Description */}
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                Ready to organize your thoughts? Create your first note to get started on your journey.
            </p>

            {/* Create Button */}
            <Link
                to="/create"
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg shadow-green-600/25 hover:shadow-green-700/30"
            >
                Create Your First Note
            </Link>
        </div>
    </div>
);

export default NotesNotFound;