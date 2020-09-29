import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { REACTION_BRAVO, REACTION_GOOD_IDEA, REACTION_LOVE, REACTION_SIZE_M, REACTION_THANK_YOU } from '../constants';
import styles from './index.module.scss';
import { Bravo, GoodIdea, Love, Thankyou } from './images';

// TODO: move final icons to @goodhood/icons
const ICONS = {
  [REACTION_THANK_YOU]: Thankyou,
  [REACTION_GOOD_IDEA]: GoodIdea,
  [REACTION_BRAVO]: Bravo,
  [REACTION_LOVE]: Love,
};


const ReactionIcon = ({
  className: passedClassName,
  reaction,
  size = REACTION_SIZE_M,
  colorize = false,
  ...cleanProps
}) => {
  const Icon = ICONS[reaction];
  const className = clsx(styles.root, passedClassName, styles[`is-${reaction}`], {
    [styles.isColorized]: colorize,
  });

  return (
    <Icon
      {...cleanProps}
      className={className}
      style={{ height: size, width: 'auto' }}
    />
  );
};

ReactionIcon.propTypes = {
  className: PropTypes.string,
  reaction: PropTypes.oneOf(Object.keys(ICONS)),
  size: PropTypes.number,
  colorize: PropTypes.bool,
};

export default ReactionIcon;
