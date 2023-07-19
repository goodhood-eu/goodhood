declare const window: Window & {
  dataLayer: Record<string, unknown>[];
  trackingOptions: { debug?: boolean }
};

export const setup = () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
  });
};

export const setupTrackingOptions = () => {
  window.trackingOptions = window.trackingOptions || { debug: false };
};
export const getScriptSource = (id: string) => {
  const source = new URL('/gtm.js', 'https://www.googletagmanager.com');
  source.searchParams.set('id', id);
  return source.toString();
};


const dumpValue = (item: unknown) => {
  if (item instanceof Object) {
    console.log(JSON.stringify(item));
    console.dir(item);
  } else {
    console.log(item);
  }
};

type LoggerOptions = {
  collapsed?: boolean;
};

const getLogger = (id: string, options: LoggerOptions = {}) => (...args: unknown[]) => {
  if (!window.trackingOptions.debug || !args?.length) return;

  const { collapsed = false } = options;

  const step = typeof args[0] !== 'object' ? args.shift() : '';
  const wasOneSimpleArgument = args.length === 0;
  if (wasOneSimpleArgument) {
    console.log(`${id}: ${step}`);
    return;
  }

  if (collapsed) {
    console.groupCollapsed(`${id}: ${step}`);
  } else {
    console.group(`${id}: ${step}`);
  }

  args.forEach((arg) => {
    if (arg instanceof Array) {
      dumpValue(arg);
    } else if (arg instanceof Object) {
      Object.entries(arg).forEach(([key, value]) => {
        console.group(key);
        dumpValue(value);
        console.groupEnd();
      });
    } else {
      dumpValue(arg);
    }
  });
  console.groupEnd();
};

export const getNullLogger: typeof getLogger = () => () => {};
export const log = getLogger('@goodhood/tracking');

export default getLogger;
