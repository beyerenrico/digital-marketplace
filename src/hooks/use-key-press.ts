import { useEffect } from 'react';

type Event = KeyboardEvent;

export const useKeyPress = (
  key: string,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [key, handler]);
};
