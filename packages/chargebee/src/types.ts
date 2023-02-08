export type VoidFunction = () => void;

type HostedPageId = Nominal<string, 'HostedPageId'>;

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
  step?: (currentStep: string) => void;
};

type ChargebeePortalOptions = {
  close?: VoidFunction;
  paymentSourceAdd?: VoidFunction;
  paymentSourceUpdate?: VoidFunction;
  paymentSourceRemove?: VoidFunction;
  loaded?: VoidFunction;
  visit?: (sectionType: string) => void;
};

type SubscriptionId = Nominal<string, 'SubscriptionId'>;
type PaymentSourceId = Nominal<string, 'PaymentSourceId'>;

export type ChargebeeForwardOptions = {
  sectionType: string;
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

type CustomerId = Nominal<string, 'CustomerId'>;
type PortalSessionId = Nominal<string, 'PortalSessionId'>;
type PortalSessionToken = Nominal<string, 'PortalSessionToken'>;

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

export type PortalSessionSetter = () => Promise<PortalSession>;

export type OnCallHandler = (
  instance: ChargebeeInstance,
  chargebee?: Chargebee
) => void;

export type ChargebeeInstance = {
  createChargebeePortal: () => ChargebeePortal;
  setPortalSession: (callback: PortalSessionSetter) => void;
  openCheckout: (options: OpenCheckoutOptions) => void;
  logout: () => void;
  closeAll: () => void;
};

type BusinessEntityId = Nominal<string, 'BusinessEntityId'>;

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

type Chargebee = {
  init: (options: ChargebeeInitOptions) => ChargebeeInstance;
  getInstance: () => ChargebeeInstance;

  getPortalSections: () => Record<string, string>;
};

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var Chargebee: Chargebee;
}
