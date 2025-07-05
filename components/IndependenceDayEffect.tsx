'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import Fireworks with no SSR
const Fireworks = dynamic(() => import('./fireworks'), { ssr: false });

// Check if we're in development mode
const isDev = process.env.NODE_ENV === 'development';

export default function IndependenceDayEffect() {
  const [isUS, setIsUS] = useState<boolean | null>(null);
  const today = new Date();
  const isIndependenceDay = today.getMonth() === 6 && today.getDate() === 4; // July 4th

  useEffect(() => {
    // Only run on client-side in production
    if (!isDev) {
      const checkCountry = async () => {
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          setIsUS(data.country_code === 'US');
        } catch (error) {
          console.error('Error fetching country:', error);
          setIsUS(false);
        }
      };

      checkCountry();
    }
  }, []); // Removed isDev from dependencies as it's a module-level constant

  // In production, only show fireworks if conditions are met
  if (!isDev && (isUS === null || !isIndependenceDay)) {
    return null;
  }

  return <Fireworks />;
}
