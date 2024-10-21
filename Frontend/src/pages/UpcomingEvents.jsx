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
];

const UpcomingEvents = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
        {eventsData.map(event => (
          <div key={event.id} className="border-b pb-4">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <div className="flex justify-between text-gray-600">
              <div>
                <p>{event.date}</p>
                <p>{event.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
