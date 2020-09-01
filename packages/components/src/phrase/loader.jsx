import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';
import { useSessionField } from 'nebenan-redux-tools/lib/session';

import {
  PHRASE_EDITOR_URL,
  PHRASE_EDITOR_SESSION,

  getPhraseEditorConfig,
  shouldLoad,
} from './utils';

const PhraseLoader = ({ id, language }) => {
  const [isReady, setReady] = useState(false);
  const ttl = useSessionField(PHRASE_EDITOR_SESSION);
  const isEnabled = shouldLoad(ttl);

  useEffect(() => {
    window.PHRASEAPP_CONFIG = getPhraseEditorConfig(id, language);
    setReady(true);
  }, []);

  if (!isEnabled || !isReady) return null;
  return <Script url={PHRASE_EDITOR_URL} />;
};

PhraseLoader.propTypes = {
  id: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default PhraseLoader;
