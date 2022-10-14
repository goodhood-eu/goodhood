export interface TrackEvent {
  event: string;
  [key: string]: any;
}

type TrackFunc = Nullable<(event: TrackEvent) => void>;

type Configure = (options: {
  track?: TrackFunc
}) => void;

let trackFunc: TrackFunc = null;

export const configure: Configure = ({ track }) => {
  if (track === undefined) return;

  trackFunc = track;
};

export const track = (event: TrackEvent) => {
  trackFunc?.(event);
};
