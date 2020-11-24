import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';

import {
  PHRASE_EDITOR_URL,
  getPhraseEditorConfig,
  shouldLoad,
} from './utils';

const PhraseLoader = ({ id, language, session }) => {
  const [isReady, setReady] = useState(false);
  const isEnabled = shouldLoad(session);

  useEffect(() => {
    if (!isEnabled) return;

    window.PHRASEAPP_CONFIG = getPhraseEditorConfig(id, language);
    setReady(true);
  }, [id, language, isEnabled]);

  if (!isEnabled || !isReady) return null;

  // Must only render client-side
  return <Script url={PHRASE_EDITOR_URL} />;
};

PhraseLoader.propTypes = {
  id: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  session: PropTypes.object.isRequired,
};

export default PhraseLoader;
