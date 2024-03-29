export interface TrackEvent {
  event: string;
  [key: string]: unknown;
}

export type TrackFunc = (event: TrackEvent) => void;

let trackFunc: TrackFunc;

export const configure = (options: {
  track?: TrackFunc
}) => {
  const { track } = options;
  if (track === undefined) return;

  trackFunc = track;
};

export const track = (event: TrackEvent) => {
  trackFunc?.(event);
};
