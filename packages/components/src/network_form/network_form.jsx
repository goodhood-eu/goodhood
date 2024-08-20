import PropTypes from 'prop-types';
import { useRef } from 'react';
import Form from 'nebenan-form/lib/form';
import { useForm } from './hooks';

/**
 * @deprecated use app specific Formik based implementation
 */
const NetworkForm = ({
  Component = Form,
  getErrorLabel,
  onRequest,
  onRequestFailure,
  onRequestSuccess,
  onValidSubmit,
  ...rest
}) => {
  const ref = useRef(null);
  const { formError, isLocked, handleSubmit } = useForm(ref, {
    getErrorLabel,
    getRequestPromise: onRequest,
    onSubmitSuccess: onRequestSuccess,
    onSubmitError: onRequestFailure,
    onSubmit: onValidSubmit,
  });

  return (
    <Component
      {...rest}
      ref={ref}
      formError={formError}
      locked={isLocked}
      onValidSubmit={handleSubmit}
    />
  );
};

NetworkForm.propTypes = {
  Component: PropTypes.elementType.isRequired,
  getErrorLabel: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
  onRequestSuccess: PropTypes.func,
  onRequestFailure: PropTypes.func,
  onValidSubmit: PropTypes.func,
};

export default NetworkForm;
