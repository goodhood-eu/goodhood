declare const window: Window & {
  dataLayer: Record<string, unknown>[];
};
export const setupGTM = () => {
  if (!document) return;
  const script = document.createElement('script');
  script.innerHTML = `
   window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments); console.log(arguments)}
            window.gtag = gtag;
            `;
  document.head.appendChild(script);
};
export const setup = () => {
  setupGTM();
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
