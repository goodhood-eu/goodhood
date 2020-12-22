import { useContext, useRef } from 'react';
import Slider from '../slider';
import Context from '../image_zoom_provider/context';
import { useStateControlledInput } from './hooks';

const ImageZoomSlider = (props) => {
  const {
    defaultScale,
    maxScale,
    scale,
    previewSize,
    onAnchorZoom,
  } = useContext(Context);
  const ref = useRef(null);

  useStateControlledInput(ref, scale);

  const handleZoomSlider = (value) => {
    const anchor = {
      x: previewSize.width / 2,
      y: previewSize.height / 2,
    };
    onAnchorZoom(value / scale, anchor);
  };

  return (
    <Slider
      {...props}
      ref={ref}
      key={`${defaultScale}-${maxScale}`}
      min={defaultScale}
      max={maxScale}
      step={0.1}
      getLabel={() => ''}
      onUpdate={handleZoomSlider}
    />
  );
};

export default ImageZoomSlider;
