import Script from 'react-load-script';
import { initialize } from './listener';
import { setConfig } from './sourcepoint';
import { Vendor, VendorId } from '@/src/types';
import { invert } from 'lodash';

type ConsentManagerPropTypes = {
  accountId: number;
  propertyHref: string;
  baseEndpoint: string;
  scriptPath: string;
  scriptHost: string;
  vendorNamesById:Record<VendorId, Vendor>;
};
const scriptURL = (scriptPath: string, scriptHost: string) => new URL(
  scriptPath,
  scriptHost,
);

const configure = (accountId: number, propertyHref: string, baseEndpoint:string) => {
  setConfig({
    accountId,
    propertyHref,
    baseEndpoint,
  });
};
const ConsentManager = ({ accountId,
  propertyHref,
  baseEndpoint,
  scriptPath,
  scriptHost,
  vendorNamesById,
}:ConsentManagerPropTypes) => {
  const VENDOR_NAMES_BY_ID = invert(vendorNamesById) as Record<VendorId, Vendor>;

  return (
    <Script
      async
      onCreate={() => configure(accountId, propertyHref, baseEndpoint)}
      url={scriptURL(scriptPath, scriptHost).toString()}
      onLoad={() => initialize(VENDOR_NAMES_BY_ID)}
    />
  );
};

export default ConsentManager;
