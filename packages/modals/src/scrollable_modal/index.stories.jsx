/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { boolean } from '@root/.preview/src/modules/knobs';
import ScrollableModal from './index';
import ModalProvider from '../provider';

export default { title: 'ScrollableModal', component: ScrollableModal };

export const Default = () => {
  const [isActive, setActive] = useState();
  const staticPosition = boolean('staticPosition', false);

  return (
    <ModalProvider>
      <span onClick={() => setActive(true)}>Open ScrollableModal</span>

      {isActive && (
        <ScrollableModal
          header={(
            <header className="ui-card-section">Header</header>
          )}
          footer={(
            <footer className="ui-card-section">Footer</footer>
          )}
          onClose={() => setActive(false)}
          staticPosition={staticPosition}
        >
          <ul>
            {[...(new Uint8Array(0x64))].map((value, key) => (
              <li key={key}>Item {key}</li>
            ))}
          </ul>
        </ScrollableModal>
      )}
    </ModalProvider>
  );
};
