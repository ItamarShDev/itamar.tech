"use client";

import { useEffect, useState } from "react";

/**
 * A custom hook that tracks the URL hash and returns whether it matches the provided hash
 * @param hash The hash to match against (without the # prefix)
 * @returns boolean indicating if the current URL hash matches the provided hash
 */
export default function useUrlHash(hash: string): boolean {
  const [currentUrlHash, setCurrentUrlHash] = useState<string>(
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  const updateCurrentHash = () => {
    if (typeof window !== 'undefined') {
      setCurrentUrlHash(window.location.hash);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initial check
    updateCurrentHash();
    
    // Set up event listener for hash changes
    window.addEventListener("hashchange", updateCurrentHash);
    
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("hashchange", updateCurrentHash);
    };
  }, [updateCurrentHash]);

  // Check if the current hash matches the provided hash (with or without # prefix)
  const normalizedHash = hash.startsWith('#') ? hash : `#${hash}`;
  return currentUrlHash === normalizedHash || 
         currentUrlHash === (normalizedHash.startsWith('#') ? normalizedHash.slice(1) : normalizedHash);
}
