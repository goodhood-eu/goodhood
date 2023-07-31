/// <reference types="react" />
import { Vendor, VendorId } from '@/src/types';
type ConsentManagerPropTypes = {
    accountId: number;
    propertyHref: string;
    baseEndpoint: string;
    scriptPath: string;
    scriptHost: string;
    vendorNamesById: Record<VendorId, Vendor>;
};
declare const ConsentManager: ({ accountId, propertyHref, baseEndpoint, scriptPath, scriptHost, vendorNamesById, }: ConsentManagerPropTypes) => JSX.Element;
export default ConsentManager;
