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

export type ClickEvent = Prettify<ContentEvent & PlanInfoEvent & {
  search_term: string;
  click_name: string;
  click_link: string;
  content_position: string;
}>;

export type PageViewEvent = {
  page_name: string;
};

export type RemoveEvent = ContentEvent;

export type EditEvent = ContentEvent;

export type SuccessFailEvent = ContentEvent & PlanInfoEvent & {
  event_action: string;
};

export type ReactEvent = ContentEvent & {
  reaction_type: string;
};

export type SearchEvent = ContentEvent & {
  search_term: string;
  click_name: string;
};

export type SwipeEvent = ContentEvent & {
  swipe_direction: string;
};

export type ViewEvent = ContentEvent & {
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
