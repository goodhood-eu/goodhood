import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import ReactionIcon from '../reaction_icon';
import { REACTION_SIZE_M, REACTION_SIZE_S } from '../constants';

const getPaddingForSize = (size) => {
  if (size <= REACTION_SIZE_S) return 4;
  if (size <= REACTION_SIZE_M) return 8;
  return 9;
};

const ReactionIconBubble = ({
  className: passedClassName,
  reaction,
  size,
  colorized,
  filled = false,
}) => {
  const className = clsx(passedClassName, styles.root, styles[`is-${reaction}`], {
    [styles.isFilled]: filled,
    [styles.isColorized]: colorized,
  });

  // TODO: find a better system for colors
  const isIconColorized = filled ? false : colorized;

  return (
    <span className={className} style={{ padding: getPaddingForSize(size) }}>
      <ReactionIcon
        reaction={reaction}
        className={styles.icon}
        size={size}
        colorized={isIconColorized}
      />
    </span>
  );
};

export default ReactionIconBubble;
