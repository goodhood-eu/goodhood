// import { arrayOf } from 'nebenan-helpers/lib/data';
import SideScroller from './index';

export default { title: 'SideScroller', component: SideScroller };

export const Default = () => (
  <SideScroller>
    <img
      src="https://www.west-crete.com/images/panoramas/house-view.jpg"
      height="300px" alt=""
    />
  </SideScroller>
);
