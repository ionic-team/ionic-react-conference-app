// Adds jest-dom's DOM matchers (toBeInTheDocument, toHaveTextContent, ...) to Vitest's expect.
import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement matchMedia, which Ionic uses for platform and dark mode checks.
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
