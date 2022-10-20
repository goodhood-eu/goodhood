import { useState } from 'react';
import { boolean, text } from '@root/.preview/src/modules/knobs';
import { action } from '@root/.preview/src/modules/actions';
import Confirm from './index';
import ModalProvider from '../provider';

export default { title: 'Confirm', component: Confirm };

export const Default = () => {
  const [isActive, setActive] = useState<boolean>(false);
  const locked = boolean('Locked', false);
  const inverted = boolean('Inverted', false);
  const title = text('Title', 'Title');
  const content = text('Content', 'Halo halo');
  const cancelLabel = text('Cancel label', 'Cancel');
  const confirmLabel = text('Confirm label', 'Confirm');

  const confirmAction = action('Confirm');
  const cancelAction = action('Cancel');

  return (
    <ModalProvider>
      <span onClick={() => setActive(true)}>Open Confirm</span>

      {isActive && (
        <Confirm
          {...{ title, content, locked, inverted, cancelLabel, confirmLabel }}
          onConfirm={confirmAction}
          onCancel={cancelAction}
          onClose={() => setActive(false)}
        />
      )}
    </ModalProvider>
  );
};
