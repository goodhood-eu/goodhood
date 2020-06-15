import React, { useState } from 'react';
import Dots from './index';

export default { title: 'Dots', component: Dots };

export const Default = () => {
  const [active, setActive] = useState(3);

  return (
    <Dots count={10} active={active} onItemClick={setActive} />
  );
};

/**
 * Test
 * @returns {*}
 * @constructor
 */
export const Empty = () => (
  <Dots count={3} />
);
