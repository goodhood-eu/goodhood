import { useState } from 'react';
import { boolean } from '@root/.preview/src/modules/knobs';
import Modal from './index';
import ModalProvider from '../provider';

export default { title: 'Modal', component: Modal };

export const Default = () => {
  const [isActive, setActive] = useState();
  const staticPosition = boolean('Static position', false);

  return (
    <ModalProvider>
      <span onClick={() => setActive(true)}>Opeb Modal</span>

      {isActive && (
        <Modal
          staticPosition={staticPosition}
          onClose={() => setActive(false)}
        >
          Hello world
        </Modal>
      )}
    </ModalProvider>
  );
};
