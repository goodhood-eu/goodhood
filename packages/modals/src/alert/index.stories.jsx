import { useState } from 'react';
import { boolean, text } from '@root/.preview/src/modules/knobs';
import Alert from './index';
import ModalProvider from '../provider';

export default { title: 'Alert', component: Alert };

export const Default = () => {
  const [isActive, setActive] = useState();
  const persist = boolean('Persist', false);
  const title = text('Title', 'Title');
  const content = text('Content', 'Halo halo');
  const closeLabel = text('Close label', 'Close');

  return (
    <ModalProvider>
      <span onClick={() => setActive(true)}>Open Alert</span>

      {isActive && (
        <Alert
          {...{ title, content, persist, closeLabel }}
          onClose={() => setActive(false)}
        />
      )}
    </ModalProvider>
  );
};
