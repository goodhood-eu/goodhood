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
  const isMounted = boolean('Mounted', true);

  const defaultOpen = boolean('Visible', true);
  const offsetX = number('Offset x', 0);
  const offsetY = number('Offset y', 0);

  if (!isMounted) {
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
          key={defaultOpen}
          offsetX={offsetX}
          offsetY={offsetY}
          defaultOpen={defaultOpen}
        >
          <Content />
        </Popup>
      </Marker>
    </Map>
  );
};
