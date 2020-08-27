import React from 'react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';

import CookiesForm from './index';

export default { title: 'CookiesForm', component: CookiesForm, decorators: [withKnobs] };

export const Default = () => {
  const defaultModel = {
    tracking: boolean('Default tracking'),
  };

  const translations = {
    label_enable_all: text('Button enable all', 'Enable all'),
    label_save: text('Button save', 'Save'),
    label_mandatory_cookies: text('Mandatory cookies', 'Mandatory cookies'),
    label_tracking_cookies: text('Tracking cookies', 'Tracking cookies'),
    description_mandatory_cookies: text('Mandatory cookies details', 'Lorem lorem'),
    description_tracking_cookies: text('Tracking cookies details', 'Lorem lorem'),
  };

  return (
    <CookiesForm
      key={JSON.stringify(defaultModel)}
      compactView={boolean('Compact view', false)}
      defaultModel={defaultModel}
      translations={translations}
      onSubmit={(model) => console.info('Submit:', model)}
    />
  );
};
