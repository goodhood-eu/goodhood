import { loadPrivacyManagerModal } from './sourcepoint';

export { default as ConsentManager } from './manager';
export { default as useGrant } from './use_grant';

// Read this before trying to understand what this is:
// https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md

export const showConsentManager = (privacyManagerId: number) => {
  loadPrivacyManagerModal(privacyManagerId);
};
