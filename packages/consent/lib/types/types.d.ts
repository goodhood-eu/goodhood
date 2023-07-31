import { VENDORS } from './constants';
declare const nominalType: unique symbol;
export type Nominal<T, Identifier> = T & {
    readonly [nominalType]: Identifier;
};
export type Vendor = typeof VENDORS[number];
export type VendorId = Nominal<string, 'VendorId'>;
export type TCDataEventStatus = 'tcloaded' | 'useractioncomplete';
export type TCData = {
    eventStatus: TCDataEventStatus;
    purpose: {
        consents: Record<number, boolean>;
    };
    vendor: {
        consents: Record<number, boolean>;
        legitimateInterests: Record<number, boolean>;
    };
};
export interface VendorConsents {
    grants: Record<VendorId, {
        vendorGrant: boolean;
        purposeGrants: Record<string, boolean>;
    }>;
}
type GetCustomVendorConsents = (data: Record<string, unknown> & VendorConsents, success: true) => void;
type AddEventListener = (tcData: Record<string, unknown> & TCData, success: true) => void;
type RemoveEventListener = (success: true) => void;
type TCDataHandler = (tcData: TCData, success: boolean) => void;
interface TCFAPI {
    (command: 'getCustomVendorConsents', version: 2, callback: GetCustomVendorConsents): void;
    (command: 'addEventListener', version: 2, callback: AddEventListener, parameter?: unknown): number;
    (command: 'removeEventListener', version: 2, callback: RemoveEventListener, listenerId: number): void;
    (command: 'getTCData', version: 2, callback: TCDataHandler): void;
}
type Config = {
    gdpr: Record<string, unknown>;
    accountId: number;
    propertyHref: string;
    baseEndpoint: string;
    joinHref: boolean;
};
type PrivacyManagerTab = 'purposes' | 'vendors' | 'features' | 'purposes-li' | 'vendors-li';
interface GDPR {
    loadPrivacyManagerModal: (id: number, tab?: PrivacyManagerTab) => void;
}
type Sourcepoint = {
    config: Config;
    readonly gdpr?: GDPR;
};
declare global {
    interface Window {
        _sp_queue: (() => void)[];
        _sp_: Sourcepoint & Record<string, unknown>;
        __tcfapi: TCFAPI;
    }
}
export {};
