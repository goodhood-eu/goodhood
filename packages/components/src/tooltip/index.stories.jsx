import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import Tooltip from './index';
import styles from './index.stories.module.scss';

const TOOLTIP_PLACEHOLDER = 'Design is like a joke.';

export default { title: 'Tooltip', component: Tooltip, decorators: [withKnobs] };

export const Default = () => (
  <div className={styles.container}>
    <Tooltip text={text('Tooltip text', TOOLTIP_PLACEHOLDER)}>Tooltip top</Tooltip>
    <Tooltip type="bottom" text={text('Tooltip text', TOOLTIP_PLACEHOLDER)}>Tooltip bottom</Tooltip>
    <Tooltip type="left" text={text('Tooltip text', TOOLTIP_PLACEHOLDER)}>Tooltip left</Tooltip>
    <Tooltip type="right" text={text('Tooltip text', TOOLTIP_PLACEHOLDER)}>Tooltip right</Tooltip>
  </div>
);
