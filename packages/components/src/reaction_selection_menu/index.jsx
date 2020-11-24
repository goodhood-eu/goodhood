import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { invoke } from 'nebenan-helpers/lib/utils';
import { eventCoordinates } from 'nebenan-helpers/lib/dom';
import { useEventListener } from 'nebenan-react-hocs/lib/use_event_listener';
import styles from './index.module.scss';
import { useHoverIndexCalculator, useLongHover, useLongTouch } from './hooks';
import { REACTION_BRAVO, REACTION_GOOD_IDEA, REACTION_LOVE, REACTION_THANK_YOU, REACTIONS } from '../constants';
import { ReactComponent as Bravo } from './images/bravo.svg';
import { ReactComponent as Thankyou } from './images/thankyou.svg';
import { ReactComponent as GoodIdea } from './images/good_idea.svg';
import { ReactComponent as Love } from './images/love.svg';

const ICONS = {
  [REACTION_THANK_YOU]: Thankyou,
  [REACTION_GOOD_IDEA]: GoodIdea,
  [REACTION_BRAVO]: Bravo,
  [REACTION_LOVE]: Love,
};

const ReactionSelectionMenu = ({ className, label, strings, onSelect, onClick }) => {
  const rootRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [hoverReaction, setHoverReaction] = useState(null);
  const itemRefs = useRef([]);
  const getHoverIndex = useHoverIndexCalculator(itemRefs);

  const { active: activeTouchEvents, passive: touchEvents } = useLongTouch({
    onShortTap: onClick,
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

      const selectedIndex = getHoverIndex({ x: clientX, y: clientY });
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

  const renderReaction = (reaction, index) => {
    const Icon = ICONS[reaction];

    return (
      <li
        key={reaction}
        className={clsx(styles.reaction, { [styles.hover]: hoverReaction === reaction })}
        ref={(el) => {
          itemRefs.current[index] = el;
        }}
        onClick={handleSelect.bind(undefined, reaction)}
      >
        <span className={styles.reactionLabel}>
          {strings[reaction]}
        </span>
        <Icon
          className={styles.emoji}
          reaction={reaction}
        />
      </li>
    );
  };

  return (
    <aside
      ref={rootRef}
      className={clsx(styles.root, className)}
      {...touchEvents}
      {...mouseEvents}
    >
      <header onClick={onClick}>{label}</header>
      {isActive && (
        <ul className={styles.list}>{REACTIONS.map(renderReaction)}</ul>
      )}
    </aside>
  );
};

ReactionSelectionMenu.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  onSelect: PropTypes.func,
  strings: PropTypes.object.isRequired,
};

export default ReactionSelectionMenu;
