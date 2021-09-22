// import { arrayOf } from 'nebenan-helpers/lib/data';
import SideScroller from './index';

export default { title: 'SideScroller', component: SideScroller };

export const Default = () => (
  <SideScroller>
    {/* {arrayOf(50).map((item, index) => (
      <div
        key={item + index}
        style={{ background: 'red', width: '20px', height: '20px', margin: '5px' }} />
    ))} */}
    <img
      src="https://www.west-crete.com/images/panoramas/house-view.jpg"
      height="300px" alt=""
    />
  </SideScroller>
);
