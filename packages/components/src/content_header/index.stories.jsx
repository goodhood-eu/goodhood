import { text } from '@root/.preview/src/modules/knobs';
import ContentHeader from './index';

export default { title: 'ContentHeader', component: ContentHeader };

const headerAction = (
  <span className="ui-button ui-button-small ui-button-primary">Button</span>
);

export const Default = () => (
  <ContentHeader
    title={text('title', 'Optional title')}
    description={text('description', 'Optional **markdown description**')}
  >
    <a href="https://google.com">Gorglo</a>
  </ContentHeader>
);

export const WithAction = () => (
  <ContentHeader
    title={text('title', 'Optional title')}
    description={text('description', 'Optional **markdown description**')}
    action={headerAction}
  />
);

export const WithChildren = () => (
  <ContentHeader
    title={text('title', 'Optional title')}
    description={text('description', 'Optional **markdown description**')}
  >
    I love chicken wings
  </ContentHeader>
);


export const WithActionAndChildren = () => (
  <ContentHeader
    title={text('title', 'Optional title')}
    description={text('description', 'Optional **markdown description**')}
    action={headerAction}
  >
    <p>I love chicken wings</p>
    <p>and weird bugs.</p>
  </ContentHeader>
);

export const Empty = () => <ContentHeader />;
