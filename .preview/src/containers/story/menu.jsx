import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './menu.module.scss';
import { getExampleUrl } from './utils';
import storiesStore from './stories_store';

const { entities, stories } = storiesStore;

const Menu = ({ className }) => {
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
    <ul className={clsx(className, styles.root)}>{stories.map(renderStory)}</ul>
  );
};

export default Menu;
