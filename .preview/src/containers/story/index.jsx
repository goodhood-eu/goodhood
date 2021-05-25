import { Link } from 'react-router-dom';
import Layout from '../../components/layout';
import { loadStories } from '../../modules/stories';
import styles from './index.module.scss';
import { getExampleIdFromParams, getExampleUrl } from './utils';

const { entities, stories } = loadStories();


const Menu = () => {
  const renderExample = (id) => {
    const example = entities.examples[id];

    return (
      <li key={example.title}>
        <Link to={getExampleUrl(example)}>
          {example.title}
        </Link>
      </li>
    );
  };

  const renderStory = (id) => {
    const story = entities.stories[id];

    return (
      <li key={story.title}>
        {story.title}
        <ul>{story.examples.map(renderExample)}</ul>
      </li>
    );
  };

  return (
    <ul className={styles.menu}>{stories.map(renderStory)}</ul>
  );
};

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
          <Menu />
        </div>
      </article>
    </Layout>
  );
};

export default Story;
