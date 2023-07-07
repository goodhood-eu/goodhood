declare const window: Window & { dataLayer: Record<string, unknown>[]; };

export const setup = () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
  });
};

export const getScriptSource = (id: string) => {
  const source = new URL('/gtm.js', 'https://www.googletagmanager.com');
  source.searchParams.set('id', id);
  return source.toString();
};
