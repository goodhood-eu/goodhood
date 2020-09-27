import React from 'react';
import PropTypes from 'prop-types';
import bravoIcon from './images/bravo.svg';
import goodIdeaIcon from './images/good_idea.svg';
import loveIcon from './images/love.svg';
import thankYouIcon from './images/thankyou.svg';
import { REACTION_BRAVO, REACTION_GOOD_IDEA, REACTION_LOVE, REACTION_THANK_YOU } from '../constants';

const ICONS = {
  [REACTION_THANK_YOU]: thankYouIcon,
  [REACTION_GOOD_IDEA]: goodIdeaIcon,
  [REACTION_BRAVO]: bravoIcon,
  [REACTION_LOVE]: loveIcon,
};

const ReactionIcon = ({ reaction, ...cleanProps }) => (
  <img {...cleanProps} src={ICONS[reaction]} alt={reaction} />
);

ReactionIcon.propTypes = {
  reaction: PropTypes.oneOf(Object.keys(ICONS)),
};

export default ReactionIcon;
