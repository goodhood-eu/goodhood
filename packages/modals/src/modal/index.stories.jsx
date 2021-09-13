import { useState } from 'react';
import { boolean } from '@root/.preview/src/modules/knobs';
import { action } from '@root/.preview/src/modules/actions';
import Modal from './index';
import ModalProvider from '../provider';
import styles from './index.stories.module.scss';

export default { title: 'Modal', component: Modal };

export const Default = () => {
  const [isActive, setActive] = useState();
  const staticPosition = boolean('Static position', false);
  const persist = boolean('Persist', false);
  const unmountAction = action('Unmount');
  const withLongContent = boolean('Long Content', false);

  return (
    <ModalProvider>
      <span onClick={() => setActive(true)}>Open Modal</span>

      {isActive && (
        <Modal
          {...{ staticPosition, persist }}
          onClose={() => setActive(false)}
          onUnmount={unmountAction}
        >
          {!withLongContent && (
            <div className="ui-card">
              Hello world
            </div>
          )}
          {withLongContent && (
            <div className="ui-card">
              <img className={styles.img} src="https://longc.at/longcat.jpg" alt="" />
            </div>
          )}
        </Modal>
      )}
    </ModalProvider>
  );
};
