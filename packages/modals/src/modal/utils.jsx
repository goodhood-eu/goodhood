let trackFunc = null;

export const configure = ({ track }) => {
  trackFunc = track;
};

export const track = (...args) => {
  trackFunc?.(...args);
};
