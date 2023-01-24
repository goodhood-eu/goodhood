import clsx from 'clsx';
import ChevronRight from '@goodhood/icons/lib/small/chevron_right';
import ChevronLeft from '@goodhood/icons/lib/small/chevron_left';
import { useState } from 'react';
import Layout from '../../components/layout';
import styles from './index.module.scss';
import { getExampleIdFromParams } from './utils';
import store from './store';
import Menu from './menu';
import Knobs from './knobs';


const { entities } = store;

const Story = ({ match }) => {
  const [isExpanded, setExpanded] = useState(true);
  const exampleId = getExampleIdFromParams(match.params);
  const example = entities.examples[exampleId];
  const story = example && entities.stories[example.storyId];

  const handleToggle = () => setExpanded((v) => !v);

  if (example && story?.layout === false) return <example.Component />;

  return (
    <Layout>
      <article className={styles.root}>
        <div className={styles.story}>
          {example && <example.Component />}
        </div>
        <div className={clsx(styles.panel, { [styles.isExpanded]: isExpanded })}>
          <span className={clsx(styles.menuButton, 'ui-link')} onClick={handleToggle}>
            {isExpanded && <ChevronLeft />}
            {!isExpanded && <ChevronRight />}
          </span>
          <Menu className={styles.menu} />
          <Knobs className={styles.knobs} />
        </div>
      </article>
    </Layout>
  );
};

export default Story;
