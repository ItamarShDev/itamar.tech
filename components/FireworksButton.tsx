'use client';

import { useFireworks } from '../context/FireworksContext';

// Check if we're in development mode
const isDev = process.env.NODE_ENV === 'development';

export default function FireworksButton() {
  const { showFireworks, toggleFireworks } = useFireworks();

  if (!isDev) return null;

  return (
    <button
      type="button"
      onClick={toggleFireworks}
      style={{
        background: 'none',
        border: 'none',
        color: 'inherit',
        cursor: 'pointer',
        fontSize: '0.9em',
        marginLeft: '15px',
        padding: '5px 10px',
        borderRadius: '4px',
        transition: 'background-color 0.2s',
        backgroundColor: showFireworks ? 'rgba(255, 0, 0, 0.1)' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
      }}
      title="Toggle Fireworks (Dev Mode)"
    >
      {showFireworks ? '🎆 Hide' : '🎇 Show'}
    </button>
  );
}
