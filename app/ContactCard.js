export default function ContactCard(props) {
    return (
        <div
            className="bg-gray-100 p-4 rounded-lg mb-4 cursor-pointer hover:bg-purple-100 transition"
            onClick={props.onClick}
        >
            <h2 className="text-lg font-bold text-purple-600">{props.name}</h2>
            <p className="text-sm text-gray-600">Mood: {props.mood}</p>
            <p className="text-xs text-gray-500">Last online: {props.lastOnline}</p>
        </div>
    );
}