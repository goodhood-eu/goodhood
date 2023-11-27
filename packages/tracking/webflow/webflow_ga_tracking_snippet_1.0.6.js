// If we change this file, we need to update the version number in the path https://wiki.nebenan.de/display/PROD/Google+Analytics+and+Webflow

/* global dataLayer */

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
    traffic_type: 'ga4',
  };
  dataLayer.push({ event, ...basePayload, ...payload });
};

const handleGaClick = (event) => {
  const payload = gatherData(event.currentTarget);
  if (Object.keys(payload).length) {
    sendEvent('click', payload);
  }
};

const attachGaEventListeners = () => {
  const elements = document.querySelectorAll(`[${GA_PREFIX}click-name]`);

  elements.forEach((element) => {
    element.addEventListener('click', handleGaClick);
  });
};

window.addEventListener('load', () => {
  attachGaEventListeners();

  const onLoadPayload = gatherData(document.querySelector('body'));
  if (Object.keys(onLoadPayload).length) {
    sendEvent('page_view', onLoadPayload);
  }
});

window.nebenanWebflowGA = {
  sendEvent,
};
