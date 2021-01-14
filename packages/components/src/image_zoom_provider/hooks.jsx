import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { clamp } from 'lodash';
import { getDefaultScale, getInsideBoundaries, getOffsetForNewScaleWithCustomAnchor } from './utils';
import { MAX_SCALE_FACTOR } from './constants';

const usePrevious = (value) => {
  const ref = useRef(null);
  useEffect(() => { ref.current = value; });

  return ref.current;
};

const TYPE_RESET = 'reset';
const TYPE_ANCHOR_ZOOM = 'anchor-zoom';
const TYPE_SAFE_SET_OFFSET = 'safe-set-offset';

export const useImageView = ({ previewSize, imageSize }) => {
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
      pristine: true,
    };
  }, [previewSize, imageSize]);

  const reducer = useCallback((state, action) => {
    switch (action.type) {
      case TYPE_RESET:
        return getDefaultState();

      case TYPE_ANCHOR_ZOOM: {
        const { zoomFactor, anchor, movement } = action.payload;

        const scale = clamp(state.scale * zoomFactor, state.defaultScale, state.maxScale);

        const unsafeLeft = getOffsetForNewScaleWithCustomAnchor({
          anchor: anchor.x,
          originalOffset: state.offset.left + movement.x,
          prevScale: state.scale,
          scale,
          previewLength: previewSize.width,
        });

        const unsafeTop = getOffsetForNewScaleWithCustomAnchor({
          anchor: anchor.y,
          originalOffset: state.offset.top + movement.y,
          prevScale: state.scale,
          scale,
          previewLength: previewSize.height,
        });

        const left = getInsideBoundaries(
          previewSize.width,
          imageSize.width * scale,
          unsafeLeft,
        );

        const top = getInsideBoundaries(
          previewSize.height,
          imageSize.height * scale,
          unsafeTop,
        );

        const offset = { top, left };

        return { ...state, scale, offset, pristine: false };
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

        return { ...state, offset: { left, top }, pristine: false };
      }
      default: return state;
    }
  }, [previewSize, imageSize, getDefaultState]);

  const [state, dispatch] = useReducer(reducer, getDefaultState());

  const actions = useMemo(() => ({
    reset: () => dispatch(({
      type: TYPE_RESET,
    })),
    safeSetOffset: (offset) => dispatch(({
      type: TYPE_SAFE_SET_OFFSET,
      payload: { offset },
    })),
    anchorZoom: (zoomFactor, anchor, movement) => dispatch(({
      type: TYPE_ANCHOR_ZOOM,
      payload: { zoomFactor, anchor, movement },
    })),
  }), [dispatch]);

  const previousImageSize = usePrevious(imageSize);
  const previousPreviewSize = usePrevious(previewSize);
  useEffect(() => {
    if (!imageSize || !previewSize) return;

    const isChangedImage = imageSize !== previousImageSize;
    const isChangedPristinePreview = previewSize !== previousPreviewSize && state.pristine;
    if (!isChangedImage && !isChangedPristinePreview) return;

    actions.reset();
  }, [previewSize, imageSize]);

  return [state, actions];
};
