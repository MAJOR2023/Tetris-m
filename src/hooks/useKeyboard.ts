import { useEffect } from 'react';

type Handlers = {
  onLeft: () => void;
  onRight: () => void;
  onDown: () => void;
  onUp: () => void;
  onHardDrop: () => void;
  onPause: () => void;
  onRestart: () => void;
};

export function useKeyboard(handlers: Handlers, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowLeft':
          event.preventDefault();
          handlers.onLeft();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handlers.onRight();
          break;
        case 'ArrowDown':
          event.preventDefault();
          handlers.onDown();
          break;
        case 'ArrowUp':
          event.preventDefault();
          handlers.onUp();
          break;
        case 'Space':
          event.preventDefault();
          handlers.onHardDrop();
          break;
        case 'KeyP':
          handlers.onPause();
          break;
        case 'KeyR':
          handlers.onRestart();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enabled, handlers]);
}
