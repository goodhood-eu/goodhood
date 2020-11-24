import React from 'react';
import PropTypes from 'prop-types';
import { REACTION_BRAVO, REACTION_GOOD_IDEA, REACTION_LOVE, REACTION_THANK_YOU } from '../constants';
import { ReactComponent as Bravo20 } from './images/bravo_20.svg';
import { ReactComponent as Thankyou20 } from './images/thankyou_20.svg';
import { ReactComponent as GoodIdea20 } from './images/good_idea_20.svg';
import { ReactComponent as Love20 } from './images/love_20.svg';
import { ReactComponent as Bravo24 } from './images/bravo_24.svg';
import { ReactComponent as Thankyou24 } from './images/thankyou_24.svg';
import { ReactComponent as GoodIdea24 } from './images/good_idea_24.svg';
import { ReactComponent as Love24 } from './images/love_24.svg';

const ICONS = {
  20: {
    [REACTION_THANK_YOU]: Thankyou20,
    [REACTION_GOOD_IDEA]: GoodIdea20,
    [REACTION_BRAVO]: Bravo20,
    [REACTION_LOVE]: Love20,
  },
  24: {
    [REACTION_THANK_YOU]: Thankyou24,
    [REACTION_GOOD_IDEA]: GoodIdea24,
    [REACTION_BRAVO]: Bravo24,
    [REACTION_LOVE]: Love24,
  },
};

const ReactionIconBubble = ({
  reaction,
  size,
  ...cleanProps
}) => {
  const Icon = ICONS[size][reaction];
  return <Icon {...cleanProps} />;
};

ReactionIconBubble.defaultProps = {
  size: 20,
};

ReactionIconBubble.propTypes = {
  reaction: PropTypes.oneOf(Object.keys(ICONS)),
  size: PropTypes.number.isRequired,
};

export default ReactionIconBubble;
