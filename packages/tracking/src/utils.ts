declare const window: Window & {
  dataLayer: Record<string, unknown>[];
};

export const setup = () => {
  window.dataLayer = window.dataLayer || [];
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
  });
  gtag('js', new Date());
};
export const getScriptSource = (id: string) => {
  const source = new URL('/gtm.js', 'https://www.googletagmanager.com');
  source.searchParams.set('id', id);
  return source.toString();
};

export const getConsentState = (consentState: boolean) => (consentState ? 'granted' : 'denied');
