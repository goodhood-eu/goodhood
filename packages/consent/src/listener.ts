import { listenToVendorGrantChanges } from './sourcepoint';
import { VENDORS } from './constants';
import { Vendor, VendorId } from './types';

type GrantChangeHandler = (granted: boolean) => void;

const vendorListeners = VENDORS.reduce((acc, vendor) => ({
  ...acc,
  [vendor]: new Set<GrantChangeHandler>(),
}), {} as Record<Vendor, Set<GrantChangeHandler>>);

let isInitialized = false;
export const initialize = (VENDOR_NAMES_BY_ID:Record<VendorId, Vendor>) => {
  if (isInitialized) return;

  listenToVendorGrantChanges((grants) => {
    for (const [vendorId, grant] of Object.entries(grants)) {
      const vendor = VENDOR_NAMES_BY_ID[vendorId as VendorId];

      const isUnknownVendor = !vendor;
      if (isUnknownVendor) continue;

      for (const listener of vendorListeners[vendor]) {
        listener(grant.vendorGrant);
      }
    }
  });

  isInitialized = true;
};

type TeardownCallback = () => void;

export const subscribe = (
  vendor: Vendor,
  handler: GrantChangeHandler,
): TeardownCallback => {
  vendorListeners[vendor].add(handler);

  return () => {
    vendorListeners[vendor].delete(handler);
  };
};
