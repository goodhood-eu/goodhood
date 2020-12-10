import React, { useState } from 'react';
import ImageZoom from './index';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import image from './61E1UiiGU8L._AC_SX466_.jpg';

export default { title: 'ImageZoom', component: ImageZoom, decorators: [withKnobs] };

const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/African_wild_dog_%28Lycaon_pictus_pictus%29.jpg/1024px-African_wild_dog_%28Lycaon_pictus_pictus%29.jpg';

export const Default = () => {
  return (
    <ImageZoom
      src={text('src', DEFAULT_IMAGE)}
      // src={text('src', image)}
      // src={image}
      scale={number('scale', 2, { range: true, min: 1, max: 10, step: .5 })}
    />
  );
};

