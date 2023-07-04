declare const window: Window & { dataLayer: Record<string, unknown>[]; };
declare type EventType = 'gav4.clickEvent' | 'gav4.pageviewEvent' | 'gav4.createEvent' | 'gav4.removeEvent' | 'gav4.editEvent' | 'gav5.success_failEvent' | 'gav4.reactEvent' | 'gav4.searchEvent' | 'gav4.swipeEvent' | 'gav4.viewEvent' ;
declare type BaseEvent = {
  event: EventType
  user_id: string,
  section: string,
  hoodname: string,
  element: string;
};
declare type ContentEvent = BaseEvent & {
  content_type: string,
  content_subcategory: string,
  content_reach: string,
  content_name: string,
  content_category: string,
  content_author: string
};
declare type PlanInfoEvent = BaseEvent & {
  current_plan: string,
  currency: string,
  value: string,
  item_name: string,
  transaction_id: string,
  coupon: string,
  payment_type: string
};
declare type ClickEvent = ContentEvent & PlanInfoEvent & {
  event: 'gav4.clickEvent',
  search_term: string,
  click_name: string,
  click_link: string,
  content_position: string,
};
declare type PageViewEvent = BaseEvent & {
  event: 'gav4.pageviewEvent',
  page_path: string,
  page_search: string,
  page_hash: string,
};
declare type RemoveEvent = ContentEvent & {
  event: 'gav4.removeEvent'
};
declare type EditEvent = ContentEvent & {
  event: 'gav4.editEvent'
};
declare type FailSuccessEvent = ContentEvent & PlanInfoEvent & {
  event: 'gav4.fail_successEvent',
  event_action:string,
};
declare type ReactEvent = ContentEvent & {
  event: 'gav4.reactEvent',
  reaction_type:string,
};
declare type SearchEvent = ContentEvent & {
  event: 'gav4.searchEvent',
  search_term:string,
  click_name:string,
};
declare type SwipeEvent = ContentEvent & {
  event: 'gav4.swipeEvent',
  swipe_direction:string
};
declare type ViewEvent = ContentEvent & {
  event: 'gav4.viewEvent',
  search_term:string,
  content_position:string
};
export {
  BaseEvent,
  ContentEvent,
  PlanInfoEvent,
  ClickEvent,
  PageViewEvent,
  RemoveEvent,
  EditEvent,
  FailSuccessEvent,
  ReactEvent,
  SearchEvent,
  SwipeEvent,
  ViewEvent,
};

export const useTrackEvent = () => (trackingEvent: BaseEvent) => {
  window.dataLayer.push(trackingEvent);
};
