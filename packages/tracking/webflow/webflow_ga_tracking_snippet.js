// This is used in the Webflow projects and is not a part of the tracking module.

const GA_PREFIX = 'data-ga-';

window.dataLayer = window.dataLayer || [];

const gatherData = (element) => {
  const result = {};

  if (!element.hasAttributes()) {
    return result;
  }

  for (const attrib of element.attributes) {
    if (attrib.name.startsWith(GA_PREFIX)) {
      const attributeName = attrib.name.replace(GA_PREFIX, '').replace(/-/g, '_');
      result[attributeName] = attrib.value;
    }
  }

  return result;
};

const sendEvent = (event, payload) => {
  window.dataLayer.push({ event, ...payload });
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
