'use client';
import { useState, useEffect } from 'react';

export default function FloatingCloudNotification({ cloudData, onClick, onClose }) {
    const [position, setPosition] = useState({ x: 100, y: 100 });

    useEffect(() => {
        // Play sound
        const audio = new Audio('data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==');
        audio.play().catch(() => { });

        // Animate cloud
        let yPos = 100;
        const interval = setInterval(() => {
            yPos += Math.sin(Date.now() / 300) * 2;
            setPosition({ x: 50, y: Math.max(50, Math.min(yPos, window.innerHeight - 100)) });
        }, 50);

        // Auto-close after 8 seconds
        const timeout = setTimeout(onClose, 8000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [onClose]);

    return (
        <div
            onClick={onClick}
            className="fixed cursor-pointer z-40 transition-transform hover:scale-110"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            {/* Floating Cloud */}
            <div className="text-6xl drop-shadow-lg animate-bounce">
                ☁️
            </div>

            {/* Sender name */}
            <p className="text-xs text-white font-bold text-center mt-1 bg-purple-500 px-2 py-1 rounded-full">
                {cloudData.sender}
            </p>
        </div>
    );
}