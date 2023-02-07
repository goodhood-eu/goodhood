declare const nominalType: unique symbol;

export type Nominal<Type, Identifier> = Type & {
  readonly [nominalType]: Identifier;
};

enum OpenCheckoutLayout {
  'in_app',
  'full_page'
}

export type VoidFunction = () => void; // TODO: check later

type HostedPageId = Nominal<string, 'HostedPageId'>;

export type HostedPage = {};

type OpenCheckoutOptions = {
  hostedPage: HostedPage;
  close?: VoidFunction;
  success: (hostedPageId: HostedPageId) => void;
  error?: VoidFunction;
  loaded?: VoidFunction;
  layout?: OpenCheckoutLayout;
  step?: (currentStep: string) => void; // TODO: check later
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
}

type ChargebeePortal = {
  open: (
    options: ChargebeePortalOptions,
    forwardOptions?: ChargebeeForwardOptions
  ) => void;
};

type PortalSessionId = Nominal<string, 'PortalSessionId'>;
type PortalSessionToken = Nominal<string, 'PortalSessionToken'>;

export type PortalSession = {
  id: PortalSessionId;
  token: PortalSessionToken;
  access_url: string,
  status: 'created';
  created_at: number,
  expires_at: number,
  object: 'portal_session';
  customer_id: string;
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

type ChargebeeInitOptions = {
  site: string;
  enableGTMTracking: boolean;
};

export type Chargebee = {
  init: (options: ChargebeeInitOptions) => ChargebeeInstance;
  getInstance: () => ChargebeeInstance;

  getPortalSections: () => Record<string, string>;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-redeclare, vars-on-top, no-var
  var Chargebee: Chargebee;
}
