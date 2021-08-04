import { boolean } from '@root/.preview/src/modules/knobs';
import Modal from './index';
import ModalProvider from '../provider';

export default { title: 'Modal', component: Modal };

export const Default = () => {
  const isActive = boolean('Show modal', false);
  const staticPosition = boolean('Static position', false);

  return (
    <ModalProvider>
      Hello world
    </ModalProvider>
  );
};
//   <ModalProvider>
//     {boolean('Static position', false) && (
//       <Modal
//         staticPosition={}
//         onClose={() => setActive(false)}
//       >
//         Hello world
//       </Modal>
//     )}
//   </ModalProvider>
// );
