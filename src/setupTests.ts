// Adds jest-dom's DOM matchers (toBeInTheDocument, toHaveTextContent, ...) to Vitest's expect.
import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement matchMedia, which Ionic uses for platform and dark mode checks.
window.matchMedia =
  window.matchMedia ||
  function (query: string): MediaQueryList {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    };
  };

// jsdom doesn't implement element scrolling, which the tutorial slides use.
Element.prototype.scrollTo = Element.prototype.scrollTo || (() => undefined);
