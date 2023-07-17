import { TCDataEventStatus, VendorConsents } from './types';


const getVendorGrantsByVendorId = (): VendorConsents['grants'] => {
  let grants = {} as VendorConsents['grants'];

  window.__tcfapi('getCustomVendorConsents', 2, (data, success) => {
    if (success) grants = data.grants;
  });

  return grants;
};


const isEventStatus = (status: TCDataEventStatus): status is TCDataEventStatus => (
  status === 'tcloaded' || status === 'useractioncomplete'
);

type ChangeListener = (grants: VendorConsents['grants']) => void;

export const listenToVendorGrantChanges = (handler: ChangeListener) => {
  window.__tcfapi('addEventListener', 2, async (tcdata, success) => {
    console.log('tcdata', tcdata);
    if (!success) return;

    if (isEventStatus(tcdata.eventStatus)) handler(getVendorGrantsByVendorId());
  });
};

export const loadPrivacyManagerModal = (privacyManagerId: number) => {
  window._sp_.gdpr?.loadPrivacyManagerModal(privacyManagerId);
};

type Config = {
  accountId: number,
  propertyHref: string,
  baseEndpoint: string,
};
export const setConfig = (config: Config) => {
  window._sp_queue = [];
  window._sp_ = {
    config: {
      gdpr: {},
      joinHref: true,
      accountId: config.accountId,
      propertyHref: config.propertyHref,
      baseEndpoint: config.baseEndpoint,
    },
  };
};
