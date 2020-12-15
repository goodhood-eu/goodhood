import { useCallback, useEffect, useReducer } from 'react';
import { between, getInsideBoundaries, getOffsetForNewScaleWithCustomAnchor } from './utils';
import { MAX_SCALE_FACTOR } from './constants';
import { usePrevious } from './hooks';

const TYPE_RESET = 'reset';
const TYPE_ANCHOR_ZOOM = 'anchor-zoom';
const TYPE_SAFE_SET_OFFSET = 'safe-set-offset';

const getDefaultScale = (previewSize, imageSize) => (
  previewSize.width > imageSize.width
    ? 1
    : previewSize.width / imageSize.width
);

export const useStateReducer = ({ previewSize, imageSize }) => {
  const getDefaultState = useCallback(() => {
    let scale = 1;
    let offset = { top: 0, left: 0 };

    if (previewSize && imageSize) {
      scale = getDefaultScale(previewSize, imageSize);

      offset = {
        left: getInsideBoundaries(previewSize.width, imageSize.width * scale, 0),
        top: getInsideBoundaries(previewSize.height, imageSize.height * scale, 0),
      };
    }

    return {
      scale,
      offset,
      defaultScale: scale,
      maxScale: scale * MAX_SCALE_FACTOR,
    };
  }, [previewSize, imageSize]);

  const reducer = useCallback((state, action) => {
    switch (action.type) {
      case TYPE_RESET:
        return getDefaultState();

      case TYPE_ANCHOR_ZOOM: {
        const { zoomFactor, anchor } = action.payload;

        const scale = between(state.defaultScale, state.maxScale, state.scale * zoomFactor);

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
  }, [previewSize, imageSize, getDefaultState]);

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

  const previousImageSize = usePrevious(imageSize);
  useEffect(() => {
    if (!imageSize || previewSize || imageSize === previousImageSize) return;

    actions.reset();
  }, [previewSize, imageSize]);

  return [state, actions];
};
