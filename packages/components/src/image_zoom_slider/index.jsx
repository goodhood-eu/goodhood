import { useCallback, useContext, useRef } from 'react';
import { useStateControlledInput } from 'nebenan-form/lib/base';
import clsx from 'clsx';
import Plus1OutlineIcon from '@goodhood/icons/lib/20x20/plus_1_outline';
import MinusIcon from '@goodhood/icons/lib/20x20/minus';
import styles from './index.module.scss';
import Slider from '../slider';
import Context from '../image_zoom_provider/context';


const GET_EMPTY_LABEL = () => '';

const ImageZoomSlider = ({ className, ...rest }) => {
  const {
    defaultScale,
    maxScale,
    scale,
    previewSize,
    onAnchorZoom,
  } = useContext(Context);
  const ref = useRef(null);

  useStateControlledInput(ref, scale);

  const handleZoomSlider = useCallback((value) => {
    const anchor = {
      x: previewSize.width / 2,
      y: previewSize.height / 2,
    };
    onAnchorZoom(() => value, anchor);
  }, [previewSize, onAnchorZoom]);

  return (
    <article {...rest} className={clsx(styles.root, className)}>
      <MinusIcon className={styles.label} />
      <Slider
        className={styles.slider}
        ref={ref}
        key={`${defaultScale}-${maxScale}`}
        min={defaultScale}
        max={maxScale}
        step={0.01}
        getLabel={GET_EMPTY_LABEL}
        onUpdate={handleZoomSlider}
      />
      <Plus1OutlineIcon className={styles.label} />
    </article>
  );
};

export default ImageZoomSlider;
