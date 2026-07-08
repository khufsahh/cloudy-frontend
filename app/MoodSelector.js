export default function MoodSelector(props) {
    const moods = [
        { image: '/moods/happy.jpg', label: 'Happy' },
        { image: '/moods/sad.jpg', label: 'Sad' },
        { image: '/moods/excited.jpg', label: 'Excited' },
        { image: '/moods/missing_you.jpg', label: 'Missing You' },
        { image: '/moods/tired.jpg', label: 'Tired' },
        { image: '/moods/frustrated.jpg', label: 'Frustrated' }
    ];

    return (
        <div className="grid grid-cols-3 gap-4">
            {moods.map((mood) => (
                <button
                    key={mood.label}
                    onClick={() => props.onSelectMood(mood.label)}
                    className={`p-2 rounded-2xl transition transform hover:scale-110 ${props.selectedMood === mood.label
                            ? 'border-4 border-purple-500 scale-110'
                            : 'border-2 border-gray-300'
                        }`}
                >
                    <img
                        src={mood.image}
                        alt={mood.label}
                        className="w-20 h-20 object-cover rounded-xl"
                    />
                    <p className="text-sm font-bold mt-2 text-center">{mood.label}</p>
                </button>
            ))}
        </div>
    );
}