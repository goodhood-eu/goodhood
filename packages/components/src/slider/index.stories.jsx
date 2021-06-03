import Slider from './index';

export default { title: 'Slider', component: Slider };


export const Default = () => <Slider label="Default slider" />;
export const MinMax = () => <Slider min={4} max={20} step={0.5} />;
export const CustomValueLabel = () => (
  <Slider
    step={0.13}
    min={10000}
    max={1000000}
    label="Join our multi level marketing scheme today! How much do you want to earn?"
    getLabel={(value) => `${value.toFixed(0)} €`}
  />
);
