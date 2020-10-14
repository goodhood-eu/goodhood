import React, { useEffect, useState } from 'react';
import config from '@root/config';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import Map from '../map';
import data from '../../sample_data';
import Marker from './index';

export default { title: 'Marker', component: Marker, decorators: [withKnobs] };

const Popup = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((new Date()).toLocaleString());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return <strong>{time}</strong>;
};

export const JSXPopup = () => {
  const visible = boolean('visible', true);

  return (
    <Map credentials={config.map_credentials} defaultZoom={10}>
      <Marker
        className="markerClass"
        position={data.markers[0]}
        popupContent={<Popup />}
        popupDefaultState={visible}
        key={visible}
      />
    </Map>
  );
};
