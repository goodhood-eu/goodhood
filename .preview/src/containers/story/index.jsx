import clsx from 'clsx';
import ArrowRight1 from '@goodhood/icons/lib/small/arrow_right_1';
import ArrowLeft1 from '@goodhood/icons/lib/small/arrow_left_1';
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
            {isExpanded && <ArrowLeft1 />}
            {!isExpanded && <ArrowRight1 />}
          </span>
          <Menu className={styles.menu} />
          <Knobs className={styles.knobs} />
        </div>
      </article>
    </Layout>
  );
};

export default Story;
