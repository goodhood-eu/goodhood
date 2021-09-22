import { text } from '@root/.preview/src/modules/knobs';
import Trigger from './trigger';
import Provider from './provider';
import { action } from '../../../.preview/src/modules/actions';

export default { title: 'Trigger', component: Trigger };

export const Default = () => {
  const handleEvent = action('onEvent');
  const event = text('event', 'pageload-trigger');

  return (
    <Provider onEvent={handleEvent}>
      <Trigger event={event} additional-data={123} />
      Triggers event on page-load. Check the console!
    </Provider>
  );
};
