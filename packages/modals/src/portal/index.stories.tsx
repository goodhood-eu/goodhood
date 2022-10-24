import Portal from './index';

export default { title: 'Portal', component: Portal };

export const Default = () => (
  <Portal>
    <h1>i am rendered in a portal</h1>
  </Portal>
);
