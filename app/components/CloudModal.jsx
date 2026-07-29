'use client';

export default function CloudModal({ cloudData, onClose }) {
    if (!cloudData) return null;

    return (
        <>
            {/* Right-side panel - 7x5 inches (fixed position) */}
            <div className="fixed right-0 top-0 w-80 h-screen bg-gradient-to-b from-purple-200 via-pink-100 to-yellow-50 shadow-2xl overflow-y-auto z-50 rounded-l-3xl">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition"
                >
                    ✕
                </button>

                {/* Cat Illustration */}
                <div className="text-8xl text-center mt-8 mb-6">🐱</div>

                {/* Messages Container */}
                <div className="space-y-4 p-6">
                    <div className="bg-white/70 backdrop-blur rounded-2xl p-4 shadow-sm border border-white/50">
                        <p className="font-semibold text-purple-700">{cloudData.sender}</p>
                        <p className="text-gray-600 text-sm mt-2">shared mood:</p>
                        <p className="text-lg mt-1">{cloudData.mood}</p>
                    </div>

                    {cloudData.text && (
                        <div className="bg-white/70 backdrop-blur rounded-2xl p-4 shadow-sm border border-white/50">
                            <p className="font-semibold text-purple-700">{cloudData.sender}</p>
                            <p className="text-gray-600 text-sm mt-2">shared text:</p>
                            <p className="text-sm mt-2 text-gray-700">"{cloudData.text}"</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}