declare const window: Window & {
  logger: { enabled?: boolean }
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

export const getLogger = (id: string, options: LoggerOptions = {}) => (...args: unknown[]) => {
  window.logger = window.logger || { enabled: false };

  if (!window.logger.enabled || !args?.length) return;

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
export const defaultLogger = getLogger('nebenan', { collapsed: true });
