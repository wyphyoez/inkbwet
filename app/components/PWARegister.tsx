"use client";

import { useEffect } from 'react';

const PWARegister = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const registerWorker = async () => {
      try {
        await navigator.serviceWorker.register('/sw.js');
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    };

    registerWorker();
  }, []);

  return null;
};

export default PWARegister;
