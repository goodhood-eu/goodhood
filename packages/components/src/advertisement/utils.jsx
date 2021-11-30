import pickBy from 'lodash/pickBy';
import { ADS_GENDER_MAP } from '@/src/advertisement/constants';

const boolFilter = (value) => Boolean(value);

export const getRequestOptions = ({
  id,

  domain,
  env,

  width,
  height,
  categories,
  keyValues = [],
  sex_id,

  options,
}) => {
  const props = pickBy({
    // Should be 'nebenan.de'
    d: domain,
    env,
  }, boolFilter);

  const kvData = { app: ['WEB'] };
  const gender = ADS_GENDER_MAP[sex_id];

  if (gender) {
    kvData.gender = [gender];
  }

  const kVs = [
    kvData,
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

    // improves sandboxing, may cause issues with some ads, disabled for now
    // isolateFrame: true,

    // redundant, added just in case
    useCookies: false,
    protocol: 'https',
  };

  return requestOptions;
};
