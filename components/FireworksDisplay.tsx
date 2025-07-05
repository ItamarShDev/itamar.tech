'use client';

import dynamic from 'next/dynamic';
import { useFireworks } from '../context/FireworksContext';

// Dynamically import Fireworks with no SSR
const Fireworks = dynamic(() => import('./fireworks'), { ssr: false });

export default function FireworksDisplay() {
  const { showFireworks } = useFireworks();
  
  console.log('FireworksDisplay - showFireworks:', showFireworks);
  
  if (!showFireworks) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1000,
      pointerEvents: 'none'
    }}>
      <Fireworks />
    </div>
  );
}
