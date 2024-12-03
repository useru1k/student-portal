import React from 'react';

const A_ResourceCard = ({ title, current, alert, threshold }) => {
  return (
    <div
    className="p-5 bg-gray-800 text-white mb-5 rounded-md shadow-lg max-w-screen-lg border-4 border-transparent border-gradient-to-r from-green-500 to-green-300 text-center"
    >
    <h3 className="mb-4 font-bold text-green-300 text-lg">{title}</h3>
    <p className="text-lg my-2">
    <strong>Current:</strong>{' '}
    {current !== null ? (
      <span className={alert ? 'text-red-400' : 'text-green-200'}>{`${current}%`}</span>
    ) : (
      'Loading...'
    )}
    </p>
    <p className="text-lg my-2">
    <strong>Alert:</strong>{' '}
    <span className={alert ? 'text-red-400' : 'text-green-200'}>{alert ? 'Yes' : 'No'}</span>
    </p>
    <p className="text-lg my-2">
    <strong>Threshold:</strong> {threshold}%
    </p>
    </div>
  );
};

export default A_ResourceCard;

// transition-transform duration-200 transform hover:scale-105 hover:shadow-2xl -- Hover Effect --
