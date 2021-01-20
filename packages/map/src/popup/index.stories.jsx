import { useEffect, useState } from 'react';
import config from '@root/config';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import Map from '../map';
import data from '../../sample_data';
import Marker from '../marker';
import Popup from './index';


export default { title: 'Popup', component: Popup, decorators: [withKnobs] };

const Content = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((new Date()).toLocaleString());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return <strong>{time || 'Loading...'}</strong>;
};

export const Default = () => {
  const isActive = boolean('Active', true);

  const defaultState = boolean('Visible', true);
  const offsetX = number('Offset x', 0);
  const offsetY = number('Offset y', 0);

  if (!isActive) {
    return null;
  }

  return (
    <Map credentials={config.map_credentials}>
      <Marker
        className="markerClass"
        position={data.markers[0]}
      >
        Marker Content
        <Popup
          key={defaultState}
          offsetX={offsetX}
          offsetY={offsetY}
          defaultState={defaultState}
        >
          <Content />
        </Popup>
      </Marker>
    </Map>
  );
};
