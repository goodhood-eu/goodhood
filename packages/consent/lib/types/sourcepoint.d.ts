import { VendorConsents } from './types';
type ChangeListener = (grants: VendorConsents['grants']) => void;
export declare const listenToVendorGrantChanges: (handler: ChangeListener) => void;
export declare const loadPrivacyManagerModal: (privacyManagerId: number) => void;
type Config = {
    accountId: number;
    propertyHref: string;
    baseEndpoint: string;
};
export declare const setConfig: (config: Config) => void;
export {};
