'use client';

if (typeof window !== 'undefined') {
  const noop = () => {};
  console.log = noop;
  console.warn = noop;
  console.error = noop;
  console.info = noop;
  console.debug = noop;
}

export default function ConsoleSilencer() {
  return null;
}
