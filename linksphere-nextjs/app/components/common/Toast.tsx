"use client"

import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { ToastType } from '../../context/ToastContext';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10);
    
    // Set up exit animation before actual removal
    return () => {
      setIsVisible(false);
    };
  }, []);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700';
    }
  };

  return (
    <div 
      className={`${getBgColor()} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} 
        transition-all duration-300 ease-in-out backdrop-blur-sm
        min-w-64 p-4 rounded-md shadow-lg border flex items-center gap-3`}
    >
      {getIcon()}
      <p className="text-sm font-medium dark:text-white">{message}</p>
      <button 
        onClick={onClose} 
        className="ml-auto p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
      >
        <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>
    </div>
  );
};

export default Toast;