import { text, withKnobs } from '@root/.preview/src/modules/knobs';
import { MemoryRouter } from 'react-router';
import Markdown from './index';
import longText from './long_text.fixture';

const STORY_PARAMETERS = {
  knobs: { escapeHTML: false },
};

export default { title: 'Markdown', component: Markdown, decorators: [withKnobs] };

export const Default = () => (
  <MemoryRouter>
    <Markdown text={text('text', longText)} />
  </MemoryRouter>
);
Default.parameters = STORY_PARAMETERS;

export const Inline = () => (
  <MemoryRouter>
    <Markdown text={text('text', 'Inline markdown > woo')} inline /> to use in sentences
  </MemoryRouter>
);
Inline.parameters = STORY_PARAMETERS;
