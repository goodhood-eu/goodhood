import { useState } from 'react';
import { text, boolean, number, select } from '@root/.preview/src/modules/knobs';
import { Sizes } from '../constants';
import TextField from './index';
import styles from './index.stories.module.scss';

import { ReactComponent as MoreIcon } from '../../../icons/lib/tiny/more.svg';
import { ReactComponent as SearchIcon } from '../../../icons/lib/tiny/search.svg';

/* Default (medium size) */
export const Default = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        disabled={boolean('Disabled', false)}
        error={text('Error message', '')}
        maxLength={number('maxLength')}
        disableBorder={boolean('disableBorder', false)}
        size={select('Size', Sizes, Sizes.medium)}
      />
    </div>
  );
};

export const WithAttachments = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        attachmentRight={<MoreIcon />}
        attachmentLeft={<SearchIcon />}
        disabled={boolean('Disabled', false)}
        error={text('Error message', '')}
        maxLength={number('maxLength')}
        disableBorder={boolean('disableBorder', false)}
        size={select('Size', Sizes, Sizes.medium)}
      />
    </div>
  );
};

export default { title: 'TextField', component: TextField };
