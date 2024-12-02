import React from 'react';

const A_ThresholdUpdater = ({ threshold, setThreshold, onUpdate }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <input
        type="number"
        value={threshold}
        onChange={(e) => setThreshold(Number(e.target.value))}
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <button
        onClick={onUpdate}
        style={{
          padding: '5px',
          background: '#28a745',
          color: 'white',
          border: 'none',
        }}
      >
        Update Thresholds
      </button>
    </div>
  );
};

export default A_ThresholdUpdater;
