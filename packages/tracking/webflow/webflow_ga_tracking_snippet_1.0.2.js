/* global gtag */

const GA_PREFIX = 'data-ga-';
const GA_STAGING_ENVIRONMENT = 'webflow-staging';


const gatherData = (element) => {
  const result = {};

  if (!element.hasAttributes()) {
    return result;
  }

  for (const attrib of element.attributes) {
    if (attrib.name.startsWith(GA_PREFIX)) {
      const attributeName = attrib.name.replace(GA_PREFIX, '').replace(/-/g, '_');

      if (!attributeName) continue;

      let parsedValue;
      try {
        parsedValue = JSON.parse(attrib.value);
      } catch (e) {
        parsedValue = attrib.value;
      }
      result[attributeName] = parsedValue;
    }
  }

  return result;
};

const sendEvent = (event, payload) => {
  const environmentMetaTag = document.querySelector('meta[name="ga-environment"]');
  const environment = environmentMetaTag ? environmentMetaTag.content : GA_STAGING_ENVIRONMENT;

  const debugModeMetaTag = document.querySelector('meta[name="ga-debug-mode"]');
  const isDebugMode = debugModeMetaTag ? debugModeMetaTag.content === 'true' : false;

  const basePayload = {
    environment,
    debug_mode: isDebugMode,
  };
  if (typeof gtag === 'function') {
    gtag('event', event, { ...basePayload, ...payload });
  }
};

const handleDataAttributeClicks = (event) => {
  const payload = gatherData(event.target);

  if (Object.keys(payload).length) {
    sendEvent('click', payload);
  }
};

window.addEventListener('load', () => {
  const onLoadPayload = gatherData(document.querySelector('body'));
  if (Object.keys(onLoadPayload).length) {
    sendEvent('page_view', onLoadPayload);
  }

  document.addEventListener('click', handleDataAttributeClicks);
});
