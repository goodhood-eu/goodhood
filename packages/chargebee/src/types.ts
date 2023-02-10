export type VoidFunction = () => void;

export type HostedPageId = Nominal<string, 'HostedPageId'>;

type HostedPageType =
  | 'checkout_new'
  | 'checkout_existing'
  | 'update_payment_method'
  | 'manage_payment_sources'
  | 'collect_now'
  | 'extend_subscription'
  | 'checkout_one_time'
  | 'pre_cancel'
  | 'checkout_gift'
  | 'claim_gift'
  | 'agreement_pfd';

type HostedPageState =
  | 'created'
  | 'requested'
  | 'succeeded'
  | 'cancelled'
  | 'acknowledged';

export type HostedPage = {
  id: HostedPageId;
  embed: boolean;
  created_at: number;
  expires_at: number;
  object: 'hosted_page';
  resource_version: number;
  state: HostedPageState;
  type: HostedPageType;
  updated_at: number;
  url: string;
};

type OpenCheckoutLayout =
  | 'in_app'
  | 'full_page';

export type OpenCheckoutOptions = {
  hostedPage: () => HostedPage;
  close?: VoidFunction;
  success: (hostedPageId: HostedPageId) => void;
  error?: VoidFunction;
  loaded?: VoidFunction;
  layout?: OpenCheckoutLayout;
  step?: (currentCheckoutStep: string) => void;
};

type ChargebeePortalOptions = {
  close?: VoidFunction;
  paymentSourceAdd?: VoidFunction;
  paymentSourceUpdate?: VoidFunction;
  paymentSourceRemove?: VoidFunction;
  loaded?: VoidFunction;
  visit?: (sectionType: PortalSectionTypes) => void;
};

export type SubscriptionId = Nominal<string, 'SubscriptionId'>;
export type PaymentSourceId = Nominal<string, 'PaymentSourceId'>;

export type ChargebeeForwardOptions = {
  sectionType: PortalSectionTypes;
  params?: {
    subscriptionId: SubscriptionId;
    paymentSourceId: PaymentSourceId;
  }
};

type ChargebeePortal = {
  open: (
    options: ChargebeePortalOptions,
    forwardOptions?: ChargebeeForwardOptions
  ) => void;
};

export type CustomerId = Nominal<string, 'CustomerId'>;
export type PortalSessionId = Nominal<string, 'PortalSessionId'>;
export type PortalSessionToken = Nominal<string, 'PortalSessionToken'>;

type PortalSessionStatus =
  | 'created'
  | 'logged_in'
  | 'logged_out'
  | 'not_yet_activated'
  | 'activated';

type PortalSession = {
  id: PortalSessionId;
  token: PortalSessionToken;
  status: PortalSessionStatus;
  object: 'portal_session';
  customer_id: CustomerId;
  access_url: string,
  created_at: number,
  expires_at: number,
};

export type GetPortalSessionFunction = () => Promise<PortalSession>;

export type OnCallHandler = (
  instance: ChargebeeInstance,
  chargebee?: Chargebee
) => void;

export type ChargebeeInstance = {
  createChargebeePortal: () => ChargebeePortal;
  setPortalSession: (callback: GetPortalSessionFunction) => void;
  openCheckout: (options: OpenCheckoutOptions) => void;
  logout: () => void;
  closeAll: () => void;
};

export type BusinessEntityId = Nominal<string, 'BusinessEntityId'>;

type ChargebeeInitOptions = {
  site: string;
  businessEntityId?: BusinessEntityId;
  domain?: string;
  publishableKey?: boolean;
  iframeOnly?: boolean;
  isItemsModel?: boolean;
  enableGATracking?: boolean;
  enableFBQTracking?: boolean;
  enableGTMTracking?: boolean;
  enableRedirectMode?: boolean;
  enableFriendbuyTracking?: boolean;
  enableRefersionTracking?: boolean;
};

const PortalSections = {
  SUBSCRIPTION_DETAILS: 'sub_details',
  SUBSCRIPTION_CANCELLATION: 'sub_cancel',
  EDIT_SUBSCRIPTION: 'edit_subscription',
  VIEW_SCHEDULED_CHANGES: 'scheduled_changes',
  ACCOUNT_DETAILS: 'account_details',
  EDIT_ACCOUNT_DETAILS: 'portal_edit_account',
  ADDRESS: 'portal_address',
  EDIT_BILLING_ADDRESS: 'portal_edit_billing_address',
  EDIT_SHIPPING_ADDRESS: 'portal_edit_shipping_address',
  EDIT_SUBSCRIPTION_CUSTOM_FIELDS: 'portal_edit_subscription_cf',
  PAYMENT_SOURCES: 'portal_payment_methods',
  ADD_PAYMENT_SOURCE: 'portal_add_payment_method',
  EDIT_PAYMENT_SOURCE: 'portal_edit_payment_method',
  VIEW_PAYMENT_SOURCE: 'portal_view_payment_method',
  CHOOSE_PAYMENT_METHOD_FOR_SUBSCRIPTION: 'portal_choose_payment_method',
  BILLING_HISTORY: 'portal_billing_history',
} as const;

export type PortalSectionsKeys = keyof typeof PortalSections;
export type PortalSectionTypes = typeof PortalSections[PortalSectionsKeys];

type Chargebee = {
  init: (options: ChargebeeInitOptions) => ChargebeeInstance;
  getInstance: () => ChargebeeInstance;

  getPortalSections: () => typeof PortalSections;
};

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var Chargebee: Chargebee;
}
