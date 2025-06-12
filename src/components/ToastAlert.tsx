'use client';
import React, { useEffect } from 'react';

interface ToastAlertProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const ToastAlert: React.FC<ToastAlertProps> = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div className={`fixed top-5 right-5 transition-all duration-300 z-50 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'} bg-green-500 text-white px-4 py-2 rounded-md shadow-lg`}>
      {message}
    </div>
  );
};

export default ToastAlert;
