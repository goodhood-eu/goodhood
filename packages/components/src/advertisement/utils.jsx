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
  const kVs = [
    { app: ['WEB'] },
  ].concat(keyValues).filter(boolFilter);

  const props = pickBy({
    userId,
    sessionId,
    env,
  }, boolFilter);

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
    dn: domain, // 'nebenan.de'

    // improves sandboxing, may cause issues with some ads, disabled for now
    // isolateFrame: true,

    useCookies: false, // redundant, added just in case
    protocol: 'https',
  };

  return requestOptions;
};
