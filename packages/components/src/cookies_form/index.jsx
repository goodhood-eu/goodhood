import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Form from 'nebenan-form/lib/form';
import FormGroup from 'nebenan-form/lib/form_group';
import Checkbox from 'nebenan-form/lib/checkbox';

import styles from './index.module.scss';


const CookiesDetails = ({ text }) => (
  <div className={styles.details}>{text}</div>
);

const CookiesForm = ({
  className,
  compactView,
  defaultModel,
  lang,
  onSubmit,
  ...rest
}) => {
  const handleValidSubmit = ({ tracking }) => {
    onSubmit({
      tracking,
      marketing: tracking,
      timestamp: Date.now(),
    });

    if (!tracking && defaultModel.tracking) {
      global.location.reload();
    }
  };

  let alternativeAction;
  if (compactView) {
    alternativeAction = (
      <span
        className="ui-button ui-button-primary"
        onClick={() => handleValidSubmit({ tracking: true })}
      >
        {lang.label_enable_all}
      </span>
    );
  }

  return (
    <Form
      {...rest}
      className={clsx(className, { [styles.isCompact]: compactView })}
      alternativeAction={alternativeAction}
      buttonText={lang.label_save}
      buttonClass={clsx('ui-button ui-button-primary', styles.submit)}
      onValidSubmit={handleValidSubmit}
    >
      <FormGroup>
        <Checkbox
          disabled defaultChecked
          label={lang.label_mandatory_cookies}
        />
      </FormGroup>
      {!compactView && <CookiesDetails text={lang.description_mandatory_cookies} />}

      <FormGroup>
        <Checkbox
          name="tracking"
          defaultChecked={defaultModel.tracking}
          label={lang.label_tracking_cookies}
        />
      </FormGroup>
      {!compactView && <CookiesDetails text={lang.description_tracking_cookies} />}
    </Form>
  );
};

CookiesForm.defaultProps = {
  compactView: false,
  defaultModel: {},
  lang: {},
};

CookiesForm.propTypes = {
  className: PropTypes.string,
  compactView: PropTypes.bool.isRequired,
  defaultModel: PropTypes.object.isRequired,
  lang: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CookiesForm;
