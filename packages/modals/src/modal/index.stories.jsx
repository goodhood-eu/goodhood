import { useState } from 'react';
import { boolean } from '@root/.preview/src/modules/knobs';
import { action } from '@root/.preview/src/modules/actions';
import Modal from './index';
import ModalProvider from '../provider';

export default { title: 'Modal', component: Modal };

export const Default = () => {
  const [isActive, setActive] = useState();
  const staticPosition = boolean('Static position', false);
  const persist = boolean('Persist', false);
  const unmountAction = action('Unmount');

  return (
    <ModalProvider>
      <span onClick={() => setActive(true)}>Open Modal</span>

      {isActive && (
        <Modal
          {...{ staticPosition, persist }}
          onClose={() => setActive(false)}
          onUnmount={unmountAction}
        >
          Hello world
        </Modal>
      )}
    </ModalProvider>
  );
};
