import { useState } from 'react';

export default function FloatingCloud() {
    const [opened, setOpened] = useState(false);

    const cloudMessage = {
        emoji: "☁️💙✨",
        text: "I was thinking about you today 💙"
    };

    if (opened) {
        return (
            <div className="fixed right-6 top-1/2 transform -translate-y-1/2 bg-white shadow-2xl rounded-3xl p-6 w-72 text-center">
                <div className="text-5xl mb-4">
                    {cloudMessage.emoji}
                </div>
                <p className="text-purple-600 font-bold text-lg mb-3">
                    They thought of you
                </p>
                <p className="text-gray-700">
                    {cloudMessage.text}
                </p>
                <button
                    onClick={() => setOpened(false)}
                    className="mt-5 bg-purple-500 text-white px-5 py-2 rounded-xl"
                >
                    Close
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setOpened(true)}
            className="fixed right-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-purple-300 to-blue-300 w-28 h-20 rounded-full shadow-2xl animate-pulse flex items-center justify-center text-5xl"
        >
            ☁️💙✨
        </button>
    );
}