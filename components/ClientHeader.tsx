'client';

import type { Dictionary } from 'translations';
import GithubLogo from './icons/github';

export default function ClientHeader({ title, translation }: { 
  title?: string;
  translation: Dictionary['header'];
}) {
  return (
    <>
      <GithubLogo />
    </>
  );
}
