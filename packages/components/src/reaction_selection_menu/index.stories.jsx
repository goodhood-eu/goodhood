import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ReactionSelectionMenu from './index';
import { REACTION_BRAVO, REACTION_GOOD_IDEA, REACTION_LOVE, REACTION_THANK_YOU } from '../constants';
import styles from './index.stories.module.scss';

export default { title: 'ReactionSelectionMenu', component: ReactionSelectionMenu, decorators: [withKnobs] };

const STRINGS = {
  [REACTION_THANK_YOU]: 'Thank You',
  [REACTION_GOOD_IDEA]: 'Good Idea',
  [REACTION_BRAVO]: 'Bravo',
  [REACTION_LOVE]: 'Love',
};

export const Default = () => {
  const label = (
    <div className="ui-button ui-button-narrow ui-button-small">
      hover / tap here
    </div>
  );

  return (
    <div className={styles.container}>
      <ReactionSelectionMenu
        strings={STRINGS}
        label={label}
        onClick={action('Label click')}
        onSelect={action('Reaction selected')}
      />
    </div>
  );
};
