import Layout from '../../components/layout';
import { loadStories } from '../../modules/stories';
import styles from './index.module.scss';

const storyStore = loadStories();
console.log(storyStore);

const Menu = () => {
  const renderExample = (example) => (
    <li key={example.title}>{example.title}</li>
  );

  const renderStory = (story) => (
    <li key={story.title}>
      {story.title}
      <ul>{story.examples.map(renderExample)}</ul>
    </li>
  );

  return (
    <ul className={styles.menu}>{storyStore.map(renderStory)}</ul>
  );
};

const Story = () => (
  <Layout>
    <article className={styles.root}>
      <div className={styles.story} />
      <div className={styles.panel}>
        <Menu />
      </div>
    </article>
  </Layout>
);

export default Story;
