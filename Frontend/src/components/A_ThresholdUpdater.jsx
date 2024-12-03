import React from 'react';

const A_ThresholdUpdater = ({ threshold, setThreshold, onUpdate }) => {
  return (
    <div className="mt-5 flex items-center space-x-4">
    <input
    type="number"
    value={threshold}
    onChange={(e) => setThreshold(Number(e.target.value))}
    className="w-20 p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    placeholder="Threshold"
    />
    <button
    onClick={onUpdate}
    className="px-4 py-2 bg-green-600 text-black font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
    Update Threshold
    </button>
    </div>
  );
};

export default A_ThresholdUpdater;
