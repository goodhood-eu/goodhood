export type BaseEvent = {
  environment: string;
  traffic_type: string;
  debug_mode?: boolean;
  user_id?: string;
  hoodname?: string;
  section?: PageSection;
  page_name?: string;
  page_track?: boolean;
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
    | 'post_detail_page'
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
  section?: PageSection;
};
export type ClickEvent = InteractionEvent & Partial<ContentEvent> & Partial<PlanInfoEvent> & {
  search_term?: string;
  click_name: string;
  click_link?: string;
  content_position?: string;
  filter_category?: string;
};

export type PageViewEvent = {
  page_name: string;
};

export type RemoveEvent = InteractionEvent & Partial<ContentEvent>;

export type EditEvent = InteractionEvent & Partial<ContentEvent>;

export type ErrorEvent = InteractionEvent & Partial<ContentEvent> & Partial<PlanInfoEvent> & {
  event_action: string;
};

export type ReactEvent = InteractionEvent & Partial<ContentEvent> & {
  reaction_type: string;
};

export type SearchEvent = InteractionEvent & Partial<ContentEvent> & {
  search_term: string;
  click_name: string;
};

export type SwipeEvent = InteractionEvent & Partial<ContentEvent> & {
  swipe_direction: string;
};

export type ViewEvent = InteractionEvent & Partial<ContentEvent> & {
  search_term: string;
  content_position: string;
};

export type PageMap = {
  selector: RegExp;
  section: PageSection;
  page_name: string;
  page_track?: boolean;
};
