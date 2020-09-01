import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import PhraseControls from './controls';

const store = createStore(() => {});
export default { title: 'PhraseControls', component: PhraseControls };

export const Default = () => <Provider store={store}><PhraseControls /></Provider>;
