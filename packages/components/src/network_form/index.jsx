import PropTypes from 'prop-types';
import { useRef } from 'react';
import Form from 'nebenan-form/lib/form';
import { useForm } from './hooks';

const NetworkForm = ({
  component: Component,
  strings,
  onRequest,
  onRequestFailure,
  onRequestSuccess,
  onValidSubmit,
  ...rest
}) => {
  const ref = useRef(null);
  const { formError, isLocked, handleSubmit } = useForm(ref, {
    strings,
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

NetworkForm.defaultProps = {
  component: Form,
};

NetworkForm.propTypes = {
  component: PropTypes.elementType.isRequired,
  strings: PropTypes.shape({
    error_server: PropTypes.string.isRequired,
    errors: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  onRequest: PropTypes.func.isRequired,
  onRequestSuccess: PropTypes.func,
  onRequestFailure: PropTypes.func,
  onValidSubmit: PropTypes.func,
};

export default NetworkForm;
