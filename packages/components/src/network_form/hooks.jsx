import { useCallback, useState } from 'react';
import usePromiseGuard from 'nebenan-react-hocs/lib/use_promise_guard';
import { invoke, invokeOn } from 'nebenan-helpers/lib/utils';
import { applyFieldErrors, getErrorsFromPayload } from './utils';

export const useForm = (formRef, {
  getRequestPromise,
  onSubmitSuccess,
  onSubmitError,
  onSubmit,
  strings,
}) => {
  const [formError, setFormError] = useState(null);
  const [isLocked, setLocked] = useState(false);
  const guard = usePromiseGuard();

  const handleRequestSuccess = useCallback((payload) => {
    setLocked(false);
    setFormError(null);

    const form = formRef.current;
    invokeOn(form, form?.setPristine);

    invoke(onSubmitSuccess, payload);
  }, [onSubmitSuccess]);

  const handleRequestFailure = useCallback((payload) => {
    const getErrorText = (name) => (name ? strings.errors[name] : null);

    setLocked(false);

    const { error, fieldErrors } = getErrorsFromPayload(payload, getErrorText);

    const applySuccess = applyFieldErrors(formRef.current, fieldErrors);

    if (error) setFormError(error);
    else if (!applySuccess) setFormError(strings.error_server);

    invoke(onSubmitError, payload);
  }, [onSubmitError, strings]);

  const handleSubmit = useCallback((model) => {
    setLocked(true);
    invoke(onSubmit, model);

    guard(() => getRequestPromise(model))
      .then(handleRequestSuccess).catch(handleRequestFailure);
  }, [getRequestPromise, onSubmit]);

  return { formError, isLocked, handleSubmit };
};
