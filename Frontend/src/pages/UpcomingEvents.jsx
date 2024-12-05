import React from 'react';

// Need to Connect to DB
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
  {
    id: 4,
    title: 'Web Development Test-I',
    date: 'October 20, 2024',
    time: '10:00 AM - 2:00 PM',
  },
  {
    id: 5,
    title: 'Web Development Test-I',
    date: 'October 20, 2024',
    time: '10:00 AM - 2:00 PM',
  },
  {
    id: 6,
    title: 'Web Development Test-I',
    date: 'October 20, 2024',
    time: '10:00 AM - 2:00 PM',
  },
  {
    id: 7,
    title: 'Web Development Test-I',
    date: 'October 20, 2024',
    time: '10:00 AM - 2:00 PM',
  },
  {
    id: 8,
    title: 'Web Development Test-I',
    date: 'October 20, 2024',
    time: '10:00 AM - 2:00 PM',
  },
  {
    id: 9,
    title: 'Web Development Test-I',
    date: 'October 20, 2024',
    time: '10:00 AM - 2:00 PM',
  },
  {
    id: 10,
    title: 'Web Development Test-I',
    date: 'October 20, 2024',
    time: '10:00 AM - 2:00 PM',
  },
  {
    id: 11,
    title: 'Web Development Test-I',
    date: 'October 20, 2024',
    time: '10:00 AM - 2:00 PM',
  },
  {
    id: 12,
    title: 'Web Development Test-I',
    date: 'October 20, 2024',
    time: '10:00 AM - 2:00 PM',
  },
  // Add more events here as needed
];

const UpcomingEvents = () => {
  return (
    <div className="h-[85vh] p-6 bg-gray-100 overflow-y-auto custom-scroll">
      <h2 className="text-2xl font-bold mb-5">Upcoming Events</h2>
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
