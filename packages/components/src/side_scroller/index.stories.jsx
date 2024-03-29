import { action } from '@root/.preview/src/modules/actions';
import SideScroller from './index';

export default { title: 'SideScroller', component: SideScroller };

export const Default = () => (
  <SideScroller onScroll={action('onScroll')}>
    <img
      src="https://www.west-crete.com/images/panoramas/house-view.jpg"
      height="300px" alt=""
    />
  </SideScroller>
);

export const WithLink = () => (
  <SideScroller onScroll={action('onScroll')}>
    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
    <a href="https://google.com">
      <img
        src="https://www.west-crete.com/images/panoramas/house-view.jpg"
        height="300px" alt=""
      />
    </a>
  </SideScroller>
);
