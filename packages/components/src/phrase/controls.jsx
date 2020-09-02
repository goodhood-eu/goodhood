import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'nebenan-form/lib/checkbox';

import { getSessionUpdate } from './utils';

import styles from './controls.module.scss';

const PhraseControls = ({ setSession }) => {
  const [isExpiring, handleCheckbox] = useState(true);

  const handleSave = () => {
    setSession(getSessionUpdate(isExpiring));
    window.location.reload();
  };

  return (
    <article>
      <div className={styles.container}>
        <Checkbox
          label="Reset after 1 hour"
          defaultChecked={isExpiring} onUpdate={handleCheckbox}
        />
        <span className={`ui-button ui-button-primary ${styles.button}`} onClick={handleSave}>
          Enable Phrase Editor
        </span>
      </div>
      <aside className={styles.hint}>
        Prepare your Phrase.com account credentials in advance. Once editor is enabled,
        you won&apos;t be able to use the website until you log into the editor or it resets.
      </aside>
    </article>
  );
};

PhraseControls.propTypes = {
  setSession: PropTypes.func.isRequired,
};

export default PhraseControls;
