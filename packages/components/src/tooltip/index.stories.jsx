import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import Tooltip from './index';
import styles from './index.stories.module.scss';

const TOOLTIP_PLACEHOLDER = 'Design is like a joke.';

export default { title: 'Tooltip', component: Tooltip, decorators: [withKnobs] };

const tooltipText = text('Tooltip text', TOOLTIP_PLACEHOLDER);

export const Default = () => (
  <div className={styles.container}>
    <Tooltip text={tooltipText}>Tooltip top</Tooltip>
    <Tooltip type="bottom" text={tooltipText}>Tooltip bottom</Tooltip>
    <Tooltip type="left" text={tooltipText}>Tooltip left</Tooltip>
    <Tooltip type="right" text={tooltipText}>Tooltip right</Tooltip>
  </div>
);
