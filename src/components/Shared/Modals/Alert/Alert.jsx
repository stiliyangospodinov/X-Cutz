import React, { useEffect, useState } from 'react';
import './alertStyles.css';

const Alert = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="alert-container">
      {message}
    </div>
  );
};

export default Alert;
