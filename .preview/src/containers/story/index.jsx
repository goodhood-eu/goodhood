import Layout from '../../components/layout';
import styles from './index.module.scss';
import { getExampleIdFromParams } from './utils';
import storiesStore from './stories_store';
import Menu from './menu';
import Knobs from './knobs';


const { entities } = storiesStore;

const Story = ({ match }) => {
  const exampleId = getExampleIdFromParams(match.params);
  const example = entities.examples[exampleId];

  return (
    <Layout>
      <article className={styles.root}>
        <div className={styles.story}>
          {example && (
            <example.Component />
          )}
        </div>
        <div className={styles.panel}>
          <Menu className={styles.menu} />
          <Knobs className={styles.knobs} />
        </div>
      </article>
    </Layout>
  );
};

export default Story;
