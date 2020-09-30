import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
  colored,
  filled = false,
}) => {
  const className = clsx(passedClassName, styles.root, styles[`type-${reaction}`], {
    [styles.isFilled]: filled,
    [styles.isColored]: colored,
  });

  return (
    <span className={className} style={{ padding: getPaddingForSize(size) }}>
      <ReactionIcon
        reaction={reaction}
        className={styles.icon}
        size={size}
        colored={filled ? false : colored}
      />
    </span>
  );
};

ReactionIconBubble.propTypes = {
  className: PropTypes.string,
  reaction: PropTypes.string.isRequired,
  size: PropTypes.number,
  colored: PropTypes.bool,
  filled: PropTypes.bool,
};

export default ReactionIconBubble;
