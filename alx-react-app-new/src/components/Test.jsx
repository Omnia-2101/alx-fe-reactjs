import React from 'react';

function Button() {
  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px'
  };

  return (
    <button style={buttonStyle}>
      Click Me
    </button>
  );
}

export default Button;