import Trigger from './trigger';
import Provider from './provider';
import { action } from '../../../.preview/src/modules/actions';

export default { title: 'Trigger', component: Trigger };

export const Default = () => {
  const handleEvent = action('onEvent');

  return (
    <Provider onEvent={handleEvent}>
      <Trigger event="pageload-trigger" additional-data={123} />
      Triggers event on page-load. Check the console!
    </Provider>
  );
};
