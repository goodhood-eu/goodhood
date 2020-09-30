import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { REACTION_BRAVO, REACTION_GOOD_IDEA, REACTION_LOVE, REACTION_SIZE_M, REACTION_THANK_YOU } from '../constants';
import styles from './index.module.scss';
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

const ReactionIcon = ({
  className: passedClassName,
  reaction,
  size = REACTION_SIZE_M,
  colored = false,
  ...cleanProps
}) => {
  const Icon = ICONS[reaction];
  const className = clsx(styles.root, passedClassName, styles[`type-${reaction}`], {
    [styles.isColored]: colored,
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
  colored: PropTypes.bool,
};

export default ReactionIcon;
