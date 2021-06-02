import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './menu.module.scss';
import { getExampleUrl } from './utils';
import store from './store';

const { entities, stories } = store;

const Menu = ({ className }) => {
  const renderExample = (id) => {
    const example = entities.examples[id];

    return (
      <li key={example.title}>
        <NavLink to={getExampleUrl(example)} activeClassName={styles.activeLink}>
          {example.title}
        </NavLink>
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
