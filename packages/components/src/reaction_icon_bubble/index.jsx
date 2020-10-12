import React from 'react';
import PropTypes from 'prop-types';
import { REACTION_BRAVO, REACTION_GOOD_IDEA, REACTION_LOVE, REACTION_THANK_YOU } from '../constants';
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

const ReactionIconBubble = ({
  reaction,
  ...cleanProps
}) => {
  const Icon = ICONS[reaction];
  return <Icon {...cleanProps} />;
};

ReactionIconBubble.propTypes = {
  reaction: PropTypes.string.isRequired,
};

export default ReactionIconBubble;
