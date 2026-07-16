'use client';


import { useState, useEffect } from 'react';
import ContactCard from './ContactCard';
import MoodSelector from './MoodSelector';
import FloatingCloud from './components/FloatingCloud';

export default function HomePage() {
  const [showContacts, setShowContacts] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{
    id: number;
    name: string;
    mood: string;
    lastOnline: string;
  } | null>(null);
  const [action, setAction] = useState<'mood' | 'message' | null>(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodText, setMoodText] = useState('');
  const [messageText, setMessageText] = useState('');
  const [sentClouds, setSentClouds] = useState<{
    id: number;
    to: string;
    mood: string;
    timestamp: string;
  }[]>([]);
  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        const response = await fetch(
          "https://cloudy-check-in-production.up.railway.app/api/checkins/all"
        );

        const result = await response.json();

        if (result.success) {
          setSentClouds(result.checkIns);
        }
      } catch (error: any) {
        console.log("Error fetching check-ins:", error.message);
      }
    };

    fetchCheckIns();
  }, []);

  const contacts = [
    { id: 1, name: 'Abubakr', mood: '😸 Happy', lastOnline: '5 minutes ago' },
    { id: 2, name: 'Khadeeja', mood: '😽 Missing You', lastOnline: 'Yesterday' }
  ];

  const handleCheckIn = () => {
    setShowContacts(true);
  };

  const handleBackHome = () => {
    setShowContacts(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-blue-300 to-purple-400 flex items-center justify-center p-4">

      {/* HOME SCREEN */}
      {!showContacts && !selectedContact && !action && (
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-4xl font-bold text-center text-purple-600 mb-2">
            ☁️ Cloudy Check-In
          </h1>
          <p className="text-center text-gray-700 mb-8 text-lg">
            Hiiiii, check in with your person
          </p>
          {sentClouds.length > 0 && (
            <div className="bg-purple-50 p-4 rounded-xl mb-6 max-h-40 overflow-y-auto">
              <p className="text-sm font-bold text-purple-600 mb-3">Recent Clouds Sent:</p>
              {sentClouds.map((cloud) => (
                <div key={cloud.id} className="text-xs text-gray-700 mb-2 pb-2 border-b border-purple-200">
                  <p><strong>To:</strong> {cloud.to}</p>
                  <p><strong>Mood:</strong> {cloud.mood}</p>
                  <p><strong>Time:</strong> {cloud.timestamp}</p>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={handleCheckIn}
            className="w-full bg-purple-400 hover:bg-purple-500 text-white font-bold py-4 px-6 rounded-xl transition transform hover:scale-105"
          >
            Check In
          </button>
        </div>
      )}

      {/* CONTACT LIST SCREEN */}
      {showContacts && !selectedContact && !action && (
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
            Choose your person
          </h1>

          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              name={contact.name}
              mood={contact.mood}
              lastOnline={contact.lastOnline}
              onClick={() => setSelectedContact(contact)}
            />
          ))}

          <button
            onClick={handleBackHome}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-xl transition mt-4"
          >
            Back
          </button>
        </div>
      )}

      {/* CHECK-IN OPTIONS SCREEN */}
      {selectedContact && !action && (
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-purple-600 mb-2">
            Send to {selectedContact.name}
          </h2>
          <p className="text-gray-600 mb-8">What do you want to share?</p>

          <div className="space-y-4">
            <button
              onClick={() => setAction('mood')}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl text-lg transition flex items-center justify-center gap-3"
            >
              😸 Share Mood
            </button>

            <button
              onClick={() => setAction('message')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl text-lg transition flex items-center justify-center gap-3"
            >
              ✍️ Send Message
            </button>
          </div>

          <button
            onClick={() => setSelectedContact(null)}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-xl transition mt-6"
          >
            Back to Contacts
          </button>
        </div>
      )}

      {/* MOOD OR MESSAGE FORM SCREEN */}
      {action && selectedContact && (
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-purple-600 mb-6">
            {action === 'mood' ? 'Share your mood with' : 'Send message to'} {selectedContact.name}
          </h2>

          {action === 'mood' ? (
            <div>
              <MoodSelector
                selectedMood={selectedMood}
                onSelectMood={setSelectedMood}
              />
              <textarea
                placeholder="Write up to 100 words about your mood..."
                value={moodText}
                onChange={(e) => setMoodText(e.target.value)}
                maxLength="100"
                className="w-full h-20 p-3 border border-gray-300 rounded-xl mt-6 mb-4 focus:outline-none focus:border-purple-500"
              />
            </div>
          ) : (
            <textarea
              placeholder="Write something nice..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="..."
            />
          )}

          <button
            onClick={async () => {
              try {
                const cloudData = {
                  receiver: selectedContact.name,
                  mood: selectedMood,
                  text: moodText || messageText,
                  type: action,
                  sender: 'CurrentUser'  // For now, hardcoded (we'll fix later)
                };
                const response = await fetch(
                  "https://cloudy-check-in-production.up.railway.app/api/checkins/send",
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cloudData)
                  });

                const result = await response.json();

                if (result.success) {
                  const newCloud = {
                    id: Date.now(),
                    to: selectedContact.name,
                    mood: selectedMood,
                    timestamp: new Date().toLocaleTimeString()
                  };
                  setSentClouds([newCloud, ...sentClouds]);
                  alert('Cloud sent to ' + selectedContact.name + ' and saved! ✅');
                } else {
                  alert('Error sending cloud: ' + result.error);
                }

                setAction(null);
                setSelectedMood(null);
                setMoodText('');
                setMessageText('');
              } catch (error) {
                alert('Error: ' + error.message);
              }
            }}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl mb-4"
          >
            Send Cloud ☁️
          </button>
          <button
            onClick={() => setAction(null)}
            className="w-full bg-gray-300 text-gray-700 font-medium py-3 rounded-2xl"
          >
            Back
          </button>
        </div>
      )}

      <FloatingCloud />

    </div>
  );
} 