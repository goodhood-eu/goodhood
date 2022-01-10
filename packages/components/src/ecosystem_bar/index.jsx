import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useOnceSwipeTracking, useScrolled } from '@/src/ecosystem_bar/hooks';
import styles from './index.module.scss';

const EcosystemBar = ({ items, onFirstSwipe, onItemClick }) => {
  const navRef = useRef(null);
  const scrolled = useScrolled(navRef);

  useOnceSwipeTracking(navRef, onFirstSwipe);

  const renderItem = (item) => (
    <li key={item.key} className={styles.item}>
      <a
        className={clsx(styles.link, { [styles.isActive]: item.isActive })}
        href={item.link}
        rel="noreferrer noopener"
        target={item.isActive ? '_self' : '_blank'}
        onClick={onItemClick.bind(undefined, item.event)}
      >
        <span className={styles.onlyMobile}>
          {item.text.mobile}
        </span>
        <span className={styles.notMobile}>
          {item.text.others}
        </span>
      </a>
    </li>
  );

  return (
    <ul className={clsx(styles.root, { [styles.scrolled]: scrolled })} ref={navRef}>
      {items.map(renderItem)}
    </ul>
  );
};

EcosystemBar.propTypes = {
  items: PropTypes.array.isRequired,
  onFirstSwipe: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default EcosystemBar;
