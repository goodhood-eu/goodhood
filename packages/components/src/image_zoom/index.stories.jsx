import { number, text, withKnobs } from '@storybook/addon-knobs';
import ImageZoom from './index';

export default { title: 'ImageZoom', component: ImageZoom, decorators: [withKnobs] };

const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/African_wild_dog_%28Lycaon_pictus_pictus%29.jpg/1024px-African_wild_dog_%28Lycaon_pictus_pictus%29.jpg';

export const Default = () => (
  <ImageZoom
    src={text('src', DEFAULT_IMAGE)}
    previewMaxViewportHeight={number('previewMaxViewportHeight', null)}
  >
    <span className="ui-button ui-button-primary">child</span>
  </ImageZoom>
);
