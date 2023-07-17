export type BaseEvent = {
  environment: string;
  user_id: string;
  hoodname: string;
  section?: PageSection;
};

export type ContentEvent = {
  content_type: string;
  content_subcategory: string;
  content_reach: string;
  content_name: string;
  content_category: string;
  content_author: string;
};

export type PlanInfoEvent = {
  current_plan: string;
  currency: string;
  value: string;
  item_name: string;
  transaction_id: string;
  coupon: string;
  payment_type: string;
};

export type PageSection =
    | 'core'
    | 'post_details_page'
    | 'marketplace'
    | 'inbox'
    | 'local_business'
    | 'groups'
    | 'events'
    | 'hood_discovery'
    | 'search'
    | 'notification'
    | 'profile'
    | 'supporter'
    | 'login_logout'
    | 'registration_verification'
    | 'cold_home'
    | 'landing_pages'
    | 'magazine'
    | 'help'
    | 'error';

type InteractionEvent = {
  element_name?: string;
};
export type ClickEvent = InteractionEvent & ContentEvent & PlanInfoEvent & {
  search_term: string;
  click_name: string;
  click_link: string;
  content_position: string;
};

export type PageViewEvent = {
  page_name: string;
};

export type RemoveEvent = InteractionEvent & ContentEvent;

export type EditEvent = InteractionEvent & ContentEvent;

export type SuccessFailEvent = InteractionEvent & ContentEvent & PlanInfoEvent & {
  event_action: string;
};

export type ReactEvent = InteractionEvent & ContentEvent & {
  reaction_type: string;
};

export type SearchEvent = InteractionEvent & ContentEvent & {
  search_term: string;
  click_name: string;
};

export type SwipeEvent = InteractionEvent & ContentEvent & {
  swipe_direction: string;
};

export type ViewEvent = InteractionEvent & ContentEvent & {
  search_term: string;
  content_position: string;
};

export type PageMapping = {
  selector: RegExp;
  section: PageSection;
  track: PageViewEvent;
};

// TODO: Remove this during cleanup
export type UnknownEvent = {
  dataCenter: string;
  click_link: string;
};

export type TrackingEvent =
  | ClickEvent
  | PageViewEvent
  | RemoveEvent
  | EditEvent
  | SuccessFailEvent
  | ReactEvent
  | SearchEvent
  | SwipeEvent
  | ViewEvent
  | UnknownEvent;

export type Prettify<T> = {
  [K in keyof T]: T[K];
};
export type TCDataEventStatus =
    | 'tcloaded'
    | 'useractioncomplete';

export type TCData = {
  eventStatus: TCDataEventStatus;
  purpose: {
    consents: Record<number, boolean>;
  },
  vendor: {
    consents: Record<number, boolean>;
    legitimateInterests: Record<number, boolean>;
  },
};
declare global {
  interface Window {
    __tcfapi: TCFAPI
  }
}

interface TCFAPI {
  (command: 'getCustomVendorConsents', version: 2, callback: GetCustomVendorConsents): void;
  (command: 'addEventListener', version: 2, callback: AddEventListener, parameter?: unknown): number;
  (command: 'removeEventListener', version: 2, callback: RemoveEventListener, listenerId: number): void;
  (command: 'getTCData', version: 2, callback: TCDataHandler): void;
}
type GetCustomVendorConsents = (
  data: Record<string, unknown> & VendorConsents,
  success: true
) => void;
type AddEventListener = (
  tcData: Record<string, unknown> & TCData,
  success: true
) => void;
type RemoveEventListener = (success: true) => void;
type TCDataHandler = (tcData: TCData, success: boolean) => void;
export interface VendorConsents {
  grants: Record<VendorId, {
    vendorGrant: boolean;
    purposeGrants: Record<string, boolean>
  }>
}
export type Vendor = typeof VENDORS[number];
export type VendorId = Nominal<string, 'VendorId'>;
export const VENDORS = [
  'Google Tag Manager',
  'Google Analytics',
] as const;

declare const nominalType: unique symbol;
export type Nominal<T, Identifier> = T & {
  readonly [nominalType]: Identifier;
};
