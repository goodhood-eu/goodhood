import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useOnceSwipeTracking, useScrolled } from '@/src/ecosystem_bar/hooks';
import styles from './index.module.scss';

const EcosystemBar = ({ items, onFirstSwipe, onClickItem }) => {
  const navRef = useRef(null);
  const scrolled = useScrolled(navRef);

  useOnceSwipeTracking(navRef, onFirstSwipe);

  return (
    <ul className={clsx(styles.root, { [styles.scrolled]: scrolled })} ref={navRef}>
      {items.map((item) => (
        <li key={item.key} className={styles.item}>
          <a
            className={clsx(styles.link, { [styles.isActive]: item.isActive })}
            href={item.link}
            rel="noreferrer noopener"
            target={item.isActive ? '_self' : '_blank'}
            onClick={() => onClickItem(item.event)}
          >
            <span className={styles.onlyMobile}>
              {item.mobile[item.key]}
            </span>
            <span className={styles.notMobile}>
              {item.other[item.key]}
              {item.others}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
};

EcosystemBar.propTypes = {
  items: PropTypes.array.isRequired,
  onFirstSwipe: PropTypes.func.isRequired,
  onClickItem: PropTypes.func.isRequired,
};

export default EcosystemBar;
