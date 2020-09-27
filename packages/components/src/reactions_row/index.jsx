import React, { useMemo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ReactionIcon from '../reaction_icon';
import styles from './index.module.scss';
import { getReactionsCount, getSortedReactionKeys } from './utils';
import { REACTIONS } from '../constants';

const ReactionsRow = ({
  withCounter = true,
  reactions,
  onClick,
  className: passedClassName,
  ...cleanProps
}) => {
  const reactionsList = useMemo(() => getSortedReactionKeys(reactions), [reactions]);
  const count = useMemo(() => getReactionsCount(reactions), [reactions]);

  if (withCounter && count === 0) return null;

  const renderReaction = (reaction) => (
    <ReactionIcon reaction={reaction} key={reaction} className={styles.icon} />
  );

  return (
    <span {...cleanProps} className={clsx(passedClassName, { 'ui-link': onClick })} onClick={onClick}>
      {reactionsList.map(renderReaction)} {withCounter && count}
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
