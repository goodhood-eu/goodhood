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
  translations,
  onSubmit,
  ...rest
}) => {
  const handleValidSubmit = ({ tracking }) => {
    onSubmit({
      dismissed: true,
      tracking,
      marketing: tracking,
      timestamp: Date.now(),
    });
  };

  let alternativeAction;
  if (compactView) {
    alternativeAction = (
      <span
        className="ui-button ui-button-primary"
        onClick={() => handleValidSubmit({ tracking: true })}
        data-track="cookies_form-enable_all"
      >
        {translations.label_enable_all}
      </span>
    );
  }

  return (
    <Form
      {...rest}
      className={clsx(className, { [styles.isCompact]: compactView })}
      alternativeAction={alternativeAction}
      buttonText={translations.label_save}
      buttonClass={clsx('ui-button ui-button-primary', styles.submit)}
      onValidSubmit={handleValidSubmit}
    >
      <FormGroup>
        <Checkbox
          disabled defaultChecked
          label={translations.label_mandatory_cookies}
        />
      </FormGroup>
      {!compactView && <CookiesDetails text={translations.description_mandatory_cookies} />}

      <FormGroup>
        <Checkbox
          name="tracking"
          defaultChecked={defaultModel.tracking}
          label={translations.label_tracking_cookies}
        />
      </FormGroup>
      {!compactView && <CookiesDetails text={translations.description_tracking_cookies} />}
    </Form>
  );
};

CookiesForm.defaultProps = {
  compactView: false,
  defaultModel: {},
  translations: {},
};

CookiesForm.propTypes = {
  className: PropTypes.string,
  compactView: PropTypes.bool.isRequired,
  defaultModel: PropTypes.object.isRequired,
  translations: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CookiesForm;
