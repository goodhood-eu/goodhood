export const media = {
  mediaS: '(min-width: 450px)',
  mediaM: '(min-width: 690px)',
  mediaL: '(min-width: 920px)',
};

export const getMedia = (node, query) => node.matchMedia(query).matches;

export const getID = () => (
  Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1)
);
