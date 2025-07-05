'use client';

import dynamic from 'next/dynamic';
import type { Dictionary } from 'translations';
import GithubLogo from './icons/github';

// Dynamically import FireworksButton with no SSR
const FireworksButton = dynamic(() => import('./FireworksButton'), { 
  ssr: false 
});

export default function ClientHeader({ title, translation }: { 
  title?: string;
  translation: Dictionary['header'];
}) {
  return (
    <>
      <GithubLogo />
      <FireworksButton />
    </>
  );
}
