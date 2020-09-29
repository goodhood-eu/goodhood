import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ReactionIcon from '../reaction_icon';
import styles from './index.module.scss';
import { REACTIONS } from '../constants';
import { useReactionData } from './hooks';

const ReactionsRow = ({
  withCounter = true,
  reactions,
  onClick,
  className: passedClassName,
  ...cleanProps
}) => {
  const { list: reactionsList, count } = useReactionData(reactions);

  if (withCounter && count === 0) return null;

  const renderReaction = (reaction) => (
    <ReactionIcon reaction={reaction} key={reaction} className={styles.icon} />
  );

  let countNode;
  if (withCounter) {
    countNode = <span className={styles.count}>{count}</span>;
  }

  return (
    <span {...cleanProps} className={clsx(passedClassName, styles.root, { 'ui-link': onClick })} onClick={onClick}>
      {reactionsList.map(renderReaction)} {countNode}
    </span>
  );
};

ReactionsRow.propTypes = {
  reactions: PropTypes.shape(REACTIONS.reduce((acc, reaction) => ({
    ...acc,
    [reaction]: PropTypes.number,
  }), {})).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  withCounter: PropTypes.bool,
};

export default ReactionsRow;
