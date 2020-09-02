import React from 'react';
import PhraseControls from './controls';

export default { title: 'PhraseControls', component: PhraseControls };

const noop = () => {};

export const Default = () => <PhraseControls setSession={noop} />;
