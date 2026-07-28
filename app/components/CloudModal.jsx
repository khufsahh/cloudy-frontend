'use client';

export default function CloudModal({ cloudData, onClose }) {
    if (!cloudData) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Modal Container - 7x5 inches */}
            <div className="w-96 h-screen relative bg-gradient-to-b from-purple-300 via-pink-200 to-yellow-100 rounded-2xl shadow-2xl p-8 overflow-y-auto">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200"
                >
                    ✕
                </button>

                {/* Cat Illustration (Placeholder) */}
                <div className="text-6xl mb-6">🐱</div>

                {/* Messages */}
                <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-md">
                        <p className="font-bold text-purple-600">{cloudData.sender}</p>
                        <p className="text-gray-700">shared mood: {cloudData.mood}</p>
                    </div>

                    {cloudData.text && (
                        <div className="bg-white rounded-lg p-4 shadow-md">
                            <p className="font-bold text-purple-600">{cloudData.sender}</p>
                            <p className="text-gray-700">shared text: "{cloudData.text}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}