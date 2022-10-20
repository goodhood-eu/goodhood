import { useState } from 'react';
import { arrayOf } from 'nebenan-helpers/lib/data';
import Modal from './index';
import styles from './scroll_lock.stories.module.scss';
import ModalProvider from '../provider';

export default { title: 'Modal - Scroll Lock', component: Modal, layout: false };

export const Default = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  return (
    <ModalProvider>
      <h1>Scroll down!</h1>

      <section className={styles.overlay}>
        <h1>This thing is here so that you can scroll down</h1>

        {arrayOf(50).map((i: number) => (
          <p key={i}>Lorem ipsum</p>
        ))}

        <span className="ui-button ui-button-primary" onClick={setActiveModal.bind(undefined, 1)}>
          open modal
        </span>
      </section>
      {activeModal === 1 && (
        <Modal
          onClose={setActiveModal.bind(undefined, null)}
          key="force-remount1"
        >
          <div className="ui-card">
            This is the very first modal
          </div>
          <span className="ui-button ui-button-primary" onClick={setActiveModal.bind(undefined, 2)}>
            open second modal
          </span>
        </Modal>
      )}

      {activeModal === 2 && (
        <Modal
          onClose={setActiveModal.bind(undefined, null)}
          key="force-remount2"
        >
          <div className="ui-card">
            This is the LAST modal!
          </div>
        </Modal>
      )}

    </ModalProvider>
  );
};
