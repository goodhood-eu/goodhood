# `@goodhood/tracking`

> Declarative tracking for react apps

Split up tracking payload setup from the actual tracking call. Avoids leaking data across the whole app.
 
- [Preview](https://goodhood-eu.github.io/goodhood/packages/tracking/preview/)

## Install

```
npm i @goodhood/tracking
```

```js
import { TrackingProvider } from '@goodhood/tracking';

const handleEvent = (payload) => {
  sendAnalyticsEvent(payload);
};

<TrackingProvider onEvent={handleEvent}>
  ...
</TrackingProvider>
```


## Preview

- `npm run start`
- Visit http://localhost:3000

## Usage

### Track an event with hooks

`trackingProvider.track(payload)` 
- sends the payload to the parent provider
- expects an object
  - with at least the `event` key
  - can have any kind of other keys

`useTrack` returns a function that forwards to `trackingProvider.track(payload)`

```jsx
import { useTrack } from '@goodhood/tracking';

export default {
    const track = useTrack();

    return (
      <button 
        type="button"
        onClick={() => { track({ event: 'button-clicked' }); }}
      >
        track now
      </button>
    );
}

```

### Track an event via class components

```jsx

class ClassComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.provider.track({ event: 'button-clicked' });
  }

  render() {
    return (
      <>
        <Provider ref={(provider) => { this.provider = provider; }} />
        <button type="button" onClick={this.handleClick} className="ui-button ui-button-primary">
          press me to track (check console)
        </button>
      </>
    );
  }
}
```


### Track on mount

`TrackingTrigger` accepts any kind of props. All props will be forwarded as payload to `track(payload)`.

```jsx
import { TrackingTrigger } from '@goodhood/tracking';

<TrackingTrigger event="pageload" additional-data={123} />
```

### Setting up tracking data
```jsx
<Provider email="fun@mail.at">
  <Provider funnel="Post creation" any-kind-of-prop="oh yes">
    <TrackButton />
  </Provider>
</Provider>
```

### `TrackingProvider`

`TrackingProvider` accepts the following props:
- `onEvent`: Called whenever the provider receives a `track(payload)` call. Either directly or coming from a `TrackingProvider` inside children.
- `transform`: Allows to change payloads before they are sent to the parent `TrackingProvider` (or to `onEvent`) (check stories for detailed examples)
- all other props will be merged to the payload

`TrackingProvider` allows imperative access to:
- `track(payload)` as described above

