'use client';

export default function CloudModal({ messages, onClose }) {
    if (!messages || messages.length === 0) return null;

    return (
        <>
            <div className="fixed right-0 top-0 w-80 h-screen bg-gradient-to-b from-purple-200 via-pink-100 to-yellow-50 shadow-2xl overflow-y-auto z-50 rounded-l-3xl">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition"
                >
                    ✕
                </button>

                <div className="text-8xl text-center mt-8 mb-6">🐱</div>

                <div className="space-y-4 p-6">
                    {messages.map((msg, index) => (
                        <div
                            key={msg._id || index}
                            className="bg-white/70 backdrop-blur rounded-2xl p-4 shadow-sm border border-white/50"
                        >
                            <p className="font-semibold text-purple-700">{msg.sender}</p>
                            <p className="text-gray-600 text-sm mt-2">shared mood:</p>
                            <p className="text-lg mt-1">{msg.mood}</p>

                            {msg.text && (
                                <p className="text-sm mt-2 text-gray-700">"{msg.text}"</p>
                            )}

                            <p className="text-xs text-gray-400 mt-3">
                                {new Date(msg.timestamp).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}