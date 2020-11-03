# `@goodhood/map`

> React map components

## Install

```
npm i @goodhood/map
```

Install peer dependencies
```
npm i react // v16.x.x
npm i prop-types // v15.x.x
npm i clsx // v2.x.x
npm i nebenan-ui-kit // v4.x.x
npm i @babel/runtime // v7.x.x
npm i @goodhood/icons // v1.x.x
```

Include css
```js
import '@goodhood/map/styles.css'
```

## Include:

```js
import Map from '@goodhood/map/lib/map';
import Polygon from '@goodhood/map/lib/polygon';
```

# API

## Map
```jsx
import Map from '@goodhood/map/lib/map';

const App = () => (
  <Map
    {/* Credentials for maptiler */}
    credentials={{ key: 'Maptiler API secret key', map_id: 'Map style id' }}

    {/* Max level of zoom. Can be used when there is only one marker on the map */}
    maxZoom={15}

    {/* Bounds of the map. If the prop is passed, it overrides the bounding box of map layers. */}
    bounds={[]}

    {/* Lock map on desktop */}
    locked={true}

    {/* Lock map on mobile */}
    lockedMobile={true}

    {/* Animate transition of map view */}
    animate={true}

    {/* Hide attribution */}
    noAttribution={true}

    {/* Fired when map styles are loaded. Takes map as an argument */}
    onLoad={(map) => { alert('Loaded') }}
  >
    {/* Map layers. if bounds prop is not specified, the map will try to get bounds from layers */}
  </Map>
);
```

## Polygon
```jsx
import Polygon from '@goodhood/map/lib/polygon';

const App = () => (
  <Polygon
    {/* GeoJSON coordinates of polygon */}
    area={[]}

    {/* Polygon style. Get values from @goodhood/map/lib/polygon/constants */}
    type={POLYGON_ACTIVE}

    {/* Click event */}
    onClick={() => console.log('Clicked')}
  />
);
```

## Circle
```jsx
import Circle from '@goodhood/map/lib/circle';

const App = () => (
  <Circle
    {/* GeoJSON coordinates of circle center */}
    center={[]}

    {/* Circle radius in px */}
    radius={300}

    {/* Circle style. Get values from @goodhood/map/lib/circle/constants */}
    type={CIRCLE_ACTIVE}
  />
);
```

## Marker
```jsx
import Marker from '@goodhood/map/lib/marker';

const App = () => (
  <Marker
    {/* GeoJSON coordinates of marker */}
    position={[]}

    {/* Content that will be rendered in marker popup */}
    popupContent={<ReactElement />}

    {/* Open marker popup on initialization */}
    popupDefaultState={true}

    {/* Popup offset relative to marker position */}
    popupOffset={[x, y]}
  >
    {/* Marker's content. Can be image or styled element */}
  </Marker>
);


// All markers below are wrappers around <Marker /> component.
// They receive same props as <Marker />

<CircleMarker />
<EyecatcherMarker />
<ImageMarker />
<InfoMarker />
<LabelMarker />
<PinMarker />
```

# Development

## Preview

- Set maptiler credentials in root package `config/local.js` file (see `config/default.js`)
- `npm run start`
- Visit http://localhost:3000

## Add a new component

- Create `src/*/index.jsx`
  - Default exports will be re-exported with the map name
  - Named exports will be re-exported as they are (watch out for collisions)
    ```js
      // src/map/index.jsx
      export const MapType = 123;
      export Map 666;

      // usage
      import { Map, MapType } from '@goodhood/map';
    ```
- Create `src/*/index.stories.jsx`
  - Storybook will take it up automatically
