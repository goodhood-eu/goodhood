import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { invoke } from 'nebenan-helpers/lib/utils';
import { eventCoordinates } from 'nebenan-helpers/lib/dom';
import { useEventListener } from 'nebenan-react-hocs/lib/use_event_listener';
import styles from './index.module.scss';
import { useLongHover, useLongTouch } from './hooks';
import { getHoverIndex } from './utils';
import { REACTION_SIZE_M, REACTIONS } from '../constants';
import ReactionIconBubble from '../reaction_icon_bubble';

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
      if (hoverReaction) invoke(onSelect, hoverReaction);

      setHoverReaction(null);
      setIsActive(false);
    }, [hoverReaction, onSelect]),
    onMove: useCallback((event) => {
      const { clientX, clientY } = eventCoordinates(event, 'clientX', 'clientY');
      const items = itemRefs.current;

      if (!items.filter(Boolean).length) return;

      const selectedIndex = getHoverIndex(items, { x: clientX, y: clientY });
      setHoverReaction(REACTIONS[selectedIndex]);
    }, [itemRefs]),
  });

  useEventListener(rootRef, 'touchstart', activeTouchEvents.onTouchStart, { passive: false });

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
      <ReactionIconBubble
        colored
        size={REACTION_SIZE_M}
        className={styles.emoji}
        reaction={reaction}
      />
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
