declare const window: Window & {
  dataLayer: Record<string, unknown>[];
};
export const setupGTM = () => {
  if (!document || document.querySelector('.gtm-script')) return;
  const script = document.createElement('script');
  script.className = 'gtm-script';
  script.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
   `;
  document.head.appendChild(script);
};
export const getConsentState = (consentState: boolean) => (consentState ? 'granted' : 'denied');

export const setup = (defaultAdStorageConsent = false, defaultAnalyticsStorageConstent = false) => {
  setupGTM();
  gtag('consent', 'default', {
    ad_storage: getConsentState(defaultAdStorageConsent),
    analytics_storage: getConsentState(defaultAnalyticsStorageConstent),
  });

  gtag('js', new Date());
};
export const getScriptSource = (id: string) => {
  const source = new URL('/gtm.js', 'https://www.googletagmanager.com');
  source.searchParams.set('id', id);
  return source.toString();
};
