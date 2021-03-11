import pickBy from 'lodash/pickBy';

const boolFilter = (value) => Boolean(value);

export const getRequestOptions = ({
  id,

  domain,

  userId,
  sessionId,
  env,

  width,
  height,
  categories,
  keyValues = [],

  options,
}) => {
  const props = pickBy({
    userId,
    sessionId,
    env,
  }, boolFilter);

  const kVs = [
    { app: ['WEB'] },
  ].concat(keyValues).filter(boolFilter);

  const adUnit = pickBy({
    auId: id,
    auW: width,
    auH: height,
    c: categories,
    kv: kVs,
  }, boolFilter);

  const requestOptions = {
    ...options,
    ...props,

    adUnits: [adUnit],
    // Should be 'nebenan.de'
    d: domain,

    // improves sandboxing, may cause issues with some ads, disabled for now
    // isolateFrame: true,

    // redundant, added just in case
    useCookies: false,
    protocol: 'https',
  };

  return requestOptions;
};
