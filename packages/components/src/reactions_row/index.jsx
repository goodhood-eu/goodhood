import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
import { REACTIONS } from '../constants';
import { useReactionData } from './hooks';
import ReactionIconBubble from '../reaction_icon_bubble';

const ReactionsRow = ({
  withCounter = true,
  limit = REACTIONS.length,
  reactions,
  onClick,
  className: passedClassName,
  showNull = true,
  ...cleanProps
}) => {
  const { list: sortedReactionTypes, count } = useReactionData(reactions);
  const reactionTypes = sortedReactionTypes.slice(-limit);

  if (withCounter && count === 0) return showNull ? null : 0;

  const renderReaction = (reaction) => (
    <ReactionIconBubble
      reaction={reaction}
      key={reaction}
      className={styles.icon}
    />
  );

  let countNode;
  if (withCounter) {
    countNode = <span className={styles.count}>{count}</span>;
  }

  return (
    <span {...cleanProps} className={clsx(passedClassName, styles.root, { 'ui-link': onClick })} onClick={onClick}>
      {reactionTypes.map(renderReaction)} {countNode}
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
  showNull: PropTypes.bool,
  limit: PropTypes.number,
};

export default ReactionsRow;
