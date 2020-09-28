import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { invoke } from 'nebenan-helpers/lib/utils';
import { eventCoordinates } from 'nebenan-helpers/lib/dom';
import styles from './index.module.scss';
import ReactionIcon from '../reaction_icon';
import { useActiveEventListener, useLongHover, useLongTouch } from './hooks';
import { getHoverIndex } from './utils';
import { REACTIONS } from '../constants';

const ReactionSelectionMenu = ({ className, label, strings, onSelect }) => {
  const rootRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [hoverReaction, setHoverReaction] = useState(null);
  const itemRefs = useRef([]);

  const { active: activeTouchEvents, passive: touchEvents } = useLongTouch({
    onStart: useCallback(() => {
      setIsActive(true);
    }, []),
    onEnd: useCallback(() => {
      setHoverReaction(null);
      setIsActive(false);

      if (hoverReaction) invoke(onSelect, hoverReaction);
    }, [hoverReaction, onSelect]),
    onMove: useCallback((event) => {
      const { clientX, clientY } = eventCoordinates(event, 'clientX', 'clientY');
      const items = itemRefs.current;

      if (!items.filter(Boolean).length) return;

      const selectedIndex = getHoverIndex(items, { x: clientX, y: clientY });
      setHoverReaction(REACTIONS[selectedIndex]);
    }, [itemRefs]),
  });

  useActiveEventListener(rootRef, 'touchstart', activeTouchEvents.onTouchStart);

  const {
    reset: resetHover,
    events: mouseEvents,
  } = useLongHover({
    onStart: useCallback(() => {
      setIsActive(true);
    }, []),
    onEnd: useCallback(() => {
      setIsActive(false);
    }, []),
  });

  const handleSelect = (reaction) => {
    setIsActive(false);
    resetHover();
    invoke(onSelect, reaction);
  };

  const renderReaction = (reaction, index) => (
    <li
      key={reaction}
      className={clsx(styles.reaction, { [styles.hover]: hoverReaction === reaction })}
      ref={(el) => { itemRefs.current[index] = el; }}
      onClick={handleSelect.bind(undefined, reaction)}
    >
      <span className={styles.reactionLabel}>
        {strings[reaction]}
      </span>
      <ReactionIcon className={styles.emoji} reaction={reaction} />
    </li>
  );

  return (
    <aside
      ref={rootRef}
      className={clsx(styles.root, className)}
      {...touchEvents}
      {...mouseEvents}
    >
      <header>{label}</header>
      {isActive && (
        <ul className={styles.list}>{REACTIONS.map(renderReaction)}</ul>
      )}
    </aside>
  );
};

ReactionSelectionMenu.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node.isRequired,
  onSelect: PropTypes.func,
  strings: PropTypes.object.isRequired,
};

export default ReactionSelectionMenu;
