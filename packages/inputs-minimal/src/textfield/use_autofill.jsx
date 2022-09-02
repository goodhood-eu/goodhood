import { useState } from 'react';
import styles from './use_autofill.module.scss';

export const useAutofill = () => {
  const [isAutofilled, setAutofilled] = useState(false);

  const handleAnimationStart = (e) => {
    switch (e.animationName) {
      case styles.onAutoFillStart: {
        setAutofilled(true);
        break;
      }

      case styles.onAutoFillCancel: {
        setAutofilled(false);
        break;
      }
    }
  };

  return [isAutofilled, {
    className: styles.input,
    onAnimationStart: handleAnimationStart,
  }];
};
