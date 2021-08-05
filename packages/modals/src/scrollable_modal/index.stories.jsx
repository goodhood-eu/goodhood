/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import ScrollableModal from './index';
import ModalProvider from '../provider';

export default { title: 'ScrollableModal', component: ScrollableModal };

export const Default = () => {
  const [isActive, setActive] = useState();

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
        >
          <ul>
            {[...(new Int8Array(100))].map((value, key) => (
              <li key={key}>Item {key}</li>
            ))}
          </ul>
        </ScrollableModal>
      )}
    </ModalProvider>
  );
};
