type BaseEvent = {
  environment: string,
  user_id: string,
  section: string,
  hoodname: string,
  element: string;
};

type ContentEvent = {
  content_type: string,
  content_subcategory: string,
  content_reach: string,
  content_name: string,
  content_category: string,
  content_author: string
};

type PlanInfoEvent = {
  current_plan: string,
  currency: string,
  value: string,
  item_name: string,
  transaction_id: string,
  coupon: string,
  payment_type: string
};

type PageSection = 'core' | 'post_details_page' | 'marketplace' | 'inbox' | 'local_business' | 'groups' | 'events' | 'hood_discovery' | 'search' | 'notification' | 'profile' | 'supporter' | 'login_logout' | 'registration_verification' | 'cold_home' | 'landing_pages' | 'magazine' | 'help' | 'error' ;

type Prettify<T> = {
  [K in keyof T]: T[K];
};

type ClickEvent = Prettify<ContentEvent & PlanInfoEvent & {
  search_term: string,
  click_name: string,
  click_link: string,
  content_position: string,
}>;

type PageViewEvent = {
  page_name: string,
  section: PageSection
};

type RemoveEvent = ContentEvent;

type EditEvent = ContentEvent;

type SuccessFailEvent = ContentEvent & PlanInfoEvent & {
  event_action:string,
};

type ReactEvent = ContentEvent & {
  reaction_type:string,
};

type SearchEvent = ContentEvent & {
  search_term:string,
  click_name:string,
};

type SwipeEvent = ContentEvent & {
  swipe_direction:string
};

type ViewEvent = ContentEvent & {
  search_term:string,
  content_position:string
};

type PageMapping = {
  selector:RegExp,
  track: Omit<PageViewEvent, 'event'>
};

// TODO: Remove this during cleanup
type UnknownEvent = {
  dataCenter: string,
  click_link: string,
};

 type TrackingEvent =
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
