declare const window: Window & { dataLayer: Record<string, unknown>[]; };

export const setup = () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
  });
};
