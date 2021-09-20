export const getEventPrefixTransformer = (prefix) => ({ event, ...rest }) => ({
  event: `${prefix}${event}`,
  ...rest,
});
