import React, { useState } from 'react';
import Dots from './index';

export default { title: 'Dots' };

export const withoutSelection = () => (
  <Dots count={10} />
);

export const withSelection = () => {
  const [active, setActive] = useState(3);

  return (
    <Dots count={10} active={active} onItemClick={setActive} />
  );
};
