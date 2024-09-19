import React from 'react';

const EnterAppButton = () => {
  const handleEnterApp = () => {
    window.location.href = 'app.html'; // app.html dosyasına yönlendirme yapar
  };

  return (
    <button className="enter-app-button" onClick={handleEnterApp}>
      Enter the App
    </button>
  );
};

export default EnterAppButton;
