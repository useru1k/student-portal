import React, { useState } from 'react';
import { AlarmClockPlus, Trash2Icon, Edit3Icon} from 'lucide-react'; // Import the plus icon

const initialEventsData = [
  {
    id: 1,
    title: 'Web Development Test-I',
    date: 'October 20, 2024',
    time: '10:00 AM - 2:00 PM',
  },
  {
    id: 2,
    title: 'Data Science Exit Test-II',
    date: 'October 25, 2024',
    time: '3:00 PM - 4:30 PM',
  },
  {
    id: 3,
    title: 'CTF',
    date: 'November 1, 2024',
    time: '11:00 AM - 1:00 PM',
  },
  
  // Add more events here as needed
];

const A_UpcomingEvents = () => {
  const [events, setEvents] = useState(initialEventsData);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    if (isEditing) {
      setEvents(events.map(event => 
        event.id === editEventId ? { ...event, ...newEvent } : event
      ));
      setIsEditing(false);
    } else {
      setEvents([...events, { id: Date.now(), ...newEvent }]);
    }
    setNewEvent({ title: '', date: '', time: '' });
    setIsModalOpen(false); // Close modal after adding/updating
  };

  const handleEditEvent = (event) => {
    setNewEvent(event);
    setEditEventId(event.id);
    setIsEditing(true);
    setIsModalOpen(true); // Open modal for editing
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="p-4">
        <div className="flex flex-row justify-between">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>

      {/* Add Event Icon */}
      <div className="mb-4">
        <AlarmClockPlus 
          className="cursor-pointer text-blue-500 hover:text-blue-700"
          size={24}
          onClick={() => {
            setNewEvent({ title: '', date: '', time: '' }); // Reset input fields
            setIsEditing(false); // Set to add mode
            setIsModalOpen(true); // Open modal
          }}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-2">{isEditing ? 'Edit Event' : 'Add New Event'}</h3>
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={handleInputChange}
              className="border p-2 rounded mb-2 w-full"
            />
            <input
              type="date"
              name="date"
              placeholder="Event Date"
              value={newEvent.date}
              onChange={handleInputChange}
              className="border p-2 rounded mb-2 w-full"
            />
            <input
              type="time"
              name="time"
              placeholder="Event Time"
              value={newEvent.time}
              onChange={handleInputChange}
              className="border p-2 rounded mb-2 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddEvent}
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              >
                {isEditing ? 'Update Event' : 'Add Event'}
              </button>
              <button
                onClick={() => setIsModalOpen(false)} // Close modal
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Events List */}
      <div className="bg-white shadow-md rounded-lg p-4 max-h-96 overflow-y-auto space-y-4 custom-scroll" style={{ maxHeight: '400px' }}>
        {events.map(event => (
          <div key={event.id} className="border-b pb-4">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <div className="flex justify-between text-gray-600">
              <div>
                <p>{event.date}</p>
                <p>{event.time}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEditEvent(event)}
                  className="text-blue-500 mr-2"
                >
                  <Edit3Icon size={18}/>
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-500"
                >
                  <Trash2Icon size={18}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default A_UpcomingEvents;
