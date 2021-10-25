import ExpandableCard from '@/src/expandable_card/index';

export default { title: 'ExpandableCard', component: ExpandableCard };

export const Default = () => (
  <ExpandableCard title="ExpandableCard title">
    ExpandableCard children
  </ExpandableCard>
);
