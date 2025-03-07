import debounce from './debounce.js';

export default function onHorizontalResize(fn) {
  let prevViewportHeight = Math.floor(document.documentElement.clientHeight);

  return debounce(
    () => {
      const newHeight = Math.floor(document.documentElement.clientHeight);
      const diff = Math.abs(prevViewportHeight - newHeight);
      prevViewportHeight = newHeight; // update

      fn();
    },
    { ms: 100 }
  );
}
