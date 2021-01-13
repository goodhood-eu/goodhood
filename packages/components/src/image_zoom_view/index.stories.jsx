import { number, text, withKnobs } from '@storybook/addon-knobs';
import ImageZoomView from './index';
import ImageZoomProvider from '../image_zoom_provider';
import ImageZoomSlider from '../image_zoom_slider';

export default { title: 'ImageZoomView', component: ImageZoomView, decorators: [withKnobs] };

const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/African_wild_dog_%28Lycaon_pictus_pictus%29.jpg/1024px-African_wild_dog_%28Lycaon_pictus_pictus%29.jpg';

export const Default = () => (
  <ImageZoomProvider>
    <ImageZoomView
      src={text('src', DEFAULT_IMAGE)}
      alt="pooping dog"
      maxViewportHeight={number('maxViewportHeight', null)}
    />
    <ImageZoomSlider />
  </ImageZoomProvider>
);
