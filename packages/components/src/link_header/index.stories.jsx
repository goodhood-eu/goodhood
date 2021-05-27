import { boolean, select, text, withKnobs } from '@root/.preview/src/modules/knobs';
import { action } from '@root/.preview/src/modules/actions';
import { MemoryRouter } from 'react-router';
import LinkHeader, { LinkHeaderLinkTheme } from './index';

export default { title: 'LinkHeader', component: LinkHeader, decorators: [withKnobs] };

export const WithRouter = () => (
  <MemoryRouter>
    <LinkHeader
      reversed={boolean('reversed', undefined)}
      action={text('action', undefined)}
      to={text('to', '/')}
      theme={select('theme', { default: undefined, LinkHeaderLinkTheme }, undefined)}
    >
      <h3>Header</h3>
      Content!
    </LinkHeader>
  </MemoryRouter>
);

export const WithOnClick = () => (
  <LinkHeader
    reversed={boolean('reversed', undefined)}
    action={text('action', undefined)}
    onClick={action('onClick')}
    theme={select('theme', { default: undefined, LinkHeaderLinkTheme }, undefined)}
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

export const WithActionNode = () => (
  <LinkHeader
    onClick={action('onClick')}
    action={<span className="ui-link">Check it out</span>}
    theme={select('theme', { default: undefined, LinkHeaderLinkTheme }, undefined)}
  >
    <h3>Header HeaderHeader HeaderHeader HeaderHeader Header    Header Header </h3>
    Content!
  </LinkHeader>
);
