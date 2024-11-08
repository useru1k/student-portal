import React from 'react';

const eventsData = [
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

const UpcomingEvents = () => {
  return (
    <div className="h-screen overflow-y-auto p-6 custom-scroll bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {eventsData.map(event => (
          <div key={`${event.id}-${event.date}`} className="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h3>
            <div className="text-gray-600">
              <p className="font-medium">{event.date}</p>
              <p>{event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

	
export default UpcomingEvents;
