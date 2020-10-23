import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Tooltip from './index';
import styles from './index.stories.module.scss';

const tooltipShort = 'Design is like a joke.';

export default { title: 'Tooltip', component: Tooltip, decorators: [withKnobs] };

export const Default = () => (
  <div className={styles.container}>
    <Tooltip text={tooltipShort}>Tooltip top</Tooltip>
    <Tooltip type="bottom" text={tooltipShort}>Tooltip bottom</Tooltip>
    <Tooltip type="left" text={tooltipShort}>Tooltip left</Tooltip>
    <Tooltip type="right" text={tooltipShort}>Tooltip right</Tooltip>
  </div>
);
