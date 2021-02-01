import Advertisement from './index';

export default { title: 'Advertisement', component: Advertisement };

export const Default = () => (
  <Advertisement
    id="00000000000e25e9"
    categories={['Brandenburg/Müllrose/15299/Bart-Müllrose']}
  />
);

export const IncorrectId = () => (
  <Advertisement id="BOOLSHEET" />
);
