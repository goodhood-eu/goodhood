import { useState } from 'react';
import { boolean, text } from '@root/.preview/src/modules/knobs';
import IllustrationModal from './index';
import ModalProvider from '../provider';

export default { title: 'IllustrationModal', component: IllustrationModal };

export const Default = () => {
  const [isActive, setActive] = useState<boolean>(false);
  const persist = boolean('Persist', false);
  const title = text('Title', 'Title');
  const content = text('Content', 'Halo halo');
  const closeLabel = text('Сlose label', 'Сlose');
  const image = text('Image', 'https://images.unsplash.com/photo-1525431836161-e40d6846e656?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=80');

  return (
    <ModalProvider>
      <span onClick={() => setActive(true)}>Open IllustrationModal</span>

      {isActive && (
        <IllustrationModal
          {...{ title, content, closeLabel, image, persist }}
          onClose={() => setActive(false)}
        />
      )}
    </ModalProvider>
  );
};
