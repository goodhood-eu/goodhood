import clsx from 'clsx';
import { useRef } from 'react';
import { useOnceSwipeTracking, useScrolled } from './hooks';
import styles from './index.module.scss';

export type EcosystemBarItem = {
  key: string,
  link: string,
  isActive: boolean,
  event: string,
  text: {
    mobile: string,
    others: string,
  },
  testId?: string,
};

type EcosystemBarProps = {
  items: EcosystemBarItem[];
  onFirstSwipe: () => void;
  onItemClick: (event: string) => void
};

export const EcosystemBar = ({ items, onFirstSwipe, onItemClick }: EcosystemBarProps) => {
  const navRef = useRef<HTMLUListElement>(null);
  const scrolled = useScrolled(navRef);

  useOnceSwipeTracking(navRef, onFirstSwipe);

  const renderItem = (item: EcosystemBarItem) => (
    <li key={item.key} className={styles.item}>
      <a
        className={clsx(styles.link, { [styles.isActive]: item.isActive })}
        href={item.link}
        rel="noreferrer noopener"
        target={item.isActive ? '_self' : '_blank'}
        onClick={() => onItemClick(item.event)}
        data-testid={item.testId}
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

export default EcosystemBar;
