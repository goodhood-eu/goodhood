import { useCallback, useReducer } from 'react';
import { between, getInsideBoundaries, getOffsetForNewScaleWithCustomAnchor } from './utils';
import { MAX_SCALE, MIN_SCALE } from './constants';

const TYPE_RESET = 'reset';
const TYPE_ANCHOR_ZOOM = 'anchor-zoom';
const TYPE_SAFE_SET_OFFSET = 'safe-set-offset';

export const useStateReducer = ({ previewSize, defaultScale, imageSize }) => {
  const getDefaultState = () => ({ scale: defaultScale, offset: { top: 0, left: 0 } });

  const reducer = useCallback((state, action) => {
    switch (action.type) {
      case TYPE_RESET:
        return getDefaultState();

      case TYPE_ANCHOR_ZOOM: {
        const { zoomFactor, anchor } = action.payload;

        const scale = between(MIN_SCALE, MAX_SCALE, state.scale * zoomFactor);

        const left = getOffsetForNewScaleWithCustomAnchor(
          anchor.x,
          state.offset.left,
          state.scale,
          scale,
          previewSize.width,
        );

        const top = getOffsetForNewScaleWithCustomAnchor(
          anchor.y,
          state.offset.top,
          state.scale,
          scale,
          previewSize.height,
        );

        const offset = { top, left };

        return { ...state, scale, offset };
      }

      case TYPE_SAFE_SET_OFFSET: {
        const { offset } = action.payload;

        const left = getInsideBoundaries(
          previewSize.width,
          imageSize.width * state.scale,
          offset.left,
        );

        const top = getInsideBoundaries(
          previewSize.height,
          imageSize.height * state.scale,
          offset.top,
        );

        return { ...state, offset: { left, top } };
      }
      default: return state;
    }
  }, [previewSize, defaultScale, imageSize]);

  const [state, dispatch] = useReducer(reducer, getDefaultState());

  const actions = {
    reset: () => dispatch(({
      type: TYPE_RESET,
    })),
    safeSetOffset: (offset) => dispatch(({
      type: TYPE_SAFE_SET_OFFSET,
      payload: { offset },
    })),
    anchorZoom: (zoomFactor, anchor) => dispatch(({
      type: TYPE_ANCHOR_ZOOM,
      payload: { zoomFactor, anchor },
    })),
  };

  return [state, actions];
};
