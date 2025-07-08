import { Link } from "react-router";

const NotesNotFound = () => (
    <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center">
            {/* Notebook Icon */}
            <div className="mb-8">
                <svg
                    className="w-20 h-20 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2m14 0H5m14 0h-3M5 21h3m0 0v-3M5 18v3m3-3h8"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 9h6m-6 4h6"
                    />
                </svg>
            </div>

            {/* Title */}
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
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
                Create Your First Note
            </Link>
        </div>
    </div>
);

export default NotesNotFound;