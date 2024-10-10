

// global.d.ts



declare global {
  interface Window {
    global: Window; 
  }
}


if (typeof window !== "undefined") {
  window.global = window;
}

export {};

  