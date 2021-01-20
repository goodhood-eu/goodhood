import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router';
import LinkHeader from './index';

export default { title: 'LinkHeader', component: LinkHeader, decorators: [withKnobs] };

export const WithRouter = () => (
  <MemoryRouter>
    <LinkHeader
      reversed={boolean('reversed', undefined)}
      label={text('label', undefined)}
      to={text('to', '/')}
    >
      <h3>Header</h3>
      Content!
    </LinkHeader>
  </MemoryRouter>
);

export const WithOnClick = () => (
  <LinkHeader
    reversed={boolean('reversed', undefined)}
    label={text('label', undefined)}
    onClick={action('onClick')}
  >
    <h3>Header</h3>
    Content!
  </LinkHeader>
);

export const Empty = () => (
  <LinkHeader>
    <h3>Header</h3>
    Content!
  </LinkHeader>
);

export const WithLabelNode = () => (
  <LinkHeader
    onClick={action('onClick')}
    label={<span className="ui-link">Check it out</span>}
  >
    <h3>Header HeaderHeader HeaderHeader HeaderHeader Header    Header Header </h3>
    Content!
  </LinkHeader>
);
