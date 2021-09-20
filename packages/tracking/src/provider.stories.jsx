import { action } from '@root/.preview/src/modules/actions';
import { text } from '@root/.preview/src/modules/knobs';
import { PureComponent } from 'react';
import Provider from './provider';
import { useTrack } from './hooks';
import { getEventPrefixTransformer } from './utils';


export default { title: 'Provider', component: Provider };

const TrackButton = () => {
  const track = useTrack();

  const handleClick = () => {
    track({ event: 'button-track' });
  };

  return (
    <button type="button" onClick={handleClick} className="ui-button ui-button-primary">
      press me to track (check console)
    </button>
  );
};

class LegacyTrackButton extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.provider.track({ event: 'legacy-button-track' });
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

export const Default = () => (
  <Provider onEvent={action('onEvent')}>
    <TrackButton />
  </Provider>
);

export const ImperativeTrackCall = () => (
  <Provider onEvent={action('onEvent')}>
    <LegacyTrackButton />
  </Provider>
);

export const NestedProviders = () => (
  <Provider onEvent={action('onEvent')} email={text('email', 'peter@hassler.in')}>
    <Provider funnel={text('funnel', 'Post creation')}>
      <TrackButton />
    </Provider>
  </Provider>
);

export const NestedProvidersWithTransformation = () => (
  <Provider onEvent={action('onEvent')} email={text('email', 'peter@hassler.in')}>
    <h2>Root</h2>
    <p>
      <TrackButton />
    </p>

    <Provider
      funnel={text('funnel', 'Post creation')}
      transform={getEventPrefixTransformer('post_')}
    >
      <h3>Inside sub-provider with transformation</h3>
      <p>
        <TrackButton />
      </p>

      <Provider transform={getEventPrefixTransformer('deep_')}>
        <h4>Inside sub-sub-provider with transformation</h4>
        <p>
          <TrackButton />
        </p>
      </Provider>
    </Provider>
  </Provider>
);

export const WithoutHandling = () => (
  <Provider>
    <TrackButton />
  </Provider>
);

export const WithoutProvider = () => <TrackButton />;
