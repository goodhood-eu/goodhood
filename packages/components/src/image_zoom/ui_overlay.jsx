import React from 'react';
import ArrowDown from '@goodhood/icons/lib/20x20/arrow_down';
import ArrowUp from '@goodhood/icons/lib/20x20/arrow_up';
import ArrowLeft from '@goodhood/icons/lib/20x20/arrow_left_1';
import ArrowRight from '@goodhood/icons/lib/20x20/arrow_right_1';
import styles from './ui_overlay.module.scss';

const UIOverlay = ({ onMoveUp, onMoveDown, onMoveLeft, onMoveRight }) => (
  <section className={styles.root}>
    {onMoveDown && (
      <span className={styles.arrowDown} onClick={onMoveDown}>
        <ArrowDown />
      </span>
    )}
    {onMoveUp && (
      <span className={styles.arrowUp} onClick={onMoveUp}>
        <ArrowUp />
      </span>
    )}
    {onMoveLeft && (
      <span className={styles.arrowLeft} onClick={onMoveLeft}>
        <ArrowLeft />
      </span>
    )}
    {onMoveRight && (
      <span className={styles.arrowRight} onClick={onMoveRight}>
        <ArrowRight />
      </span>
    )}
  </section>
);

export default UIOverlay;
