import { Vendor, VendorId } from './types';
type GrantChangeHandler = (granted: boolean) => void;
export declare const initialize: (VENDOR_NAMES_BY_ID: Record<VendorId, Vendor>) => void;
type TeardownCallback = () => void;
export declare const subscribe: (vendor: Vendor, handler: GrantChangeHandler) => TeardownCallback;
export {};
