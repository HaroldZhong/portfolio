import { useEffect, useState } from 'react';

// Returns the last listed section whose top has passed below the sticky header.
export function useScrollSpy(ids: string[], offset = 140): string {
  const [active, setActive] = useState('');
  const key = ids.join('|');
  useEffect(() => {
    const update = () => {
      let current = '';
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= offset) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [key, offset]); // ids are captured through their joined key.
  return active;
}
