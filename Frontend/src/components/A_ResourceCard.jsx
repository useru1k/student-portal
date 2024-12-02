import React from 'react';

const A_ResourceCard = ({ title, current, alert, threshold }) => {
  return (
    <div
      style={{
        padding: '20px',
        background: '#1E272E',
        color: '#fff',
        marginBottom: '20px',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
        maxWidth: '1500px',
        border: '3px solid',
        borderImage: 'linear-gradient(to right, #4CAF50, #8BC34A) 1',
        textAlign: 'center',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.02)';
        e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
      }}
    >
      <h3 style={{ marginBottom: '15px', fontWeight: 'bold', color: '#A4E656' }}>{title}</h3>
      <p style={{ fontSize: '18px', margin: '10px 0' }}>
        <strong>Current:</strong>{' '}
        {current !== null ? (
          <span style={{ color: alert ? '#FF6F61' : '#C8E6C9' }}>{`${current}%`}</span>
        ) : (
          'Loading...'
        )}
      </p>
      <p style={{ fontSize: '18px', margin: '10px 0' }}>
        <strong>Alert:</strong>{' '}
        <span style={{ color: alert ? '#FF6F61' : '#C8E6C9' }}>{alert ? 'Yes' : 'No'}</span>
      </p>
      <p style={{ fontSize: '18px', margin: '10px 0' }}>
        <strong>Threshold:</strong> {threshold}%
      </p>
    </div>
  );
};

export default A_ResourceCard;
