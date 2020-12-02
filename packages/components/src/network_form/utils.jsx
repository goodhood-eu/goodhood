const getErrorsObject = (errors, getErrorText) => {
  if (!errors) return undefined;

  return (
    Object.keys(errors).reduce((acc, name) => {
      let value = errors[name];
      if (Array.isArray(value)) value = value.map(getErrorText).join('\n');
      acc[name] = value;
      return acc;
    }, {})
  );
};

export const getErrorsFromPayload = (payload, getErrorText) => {
  const fieldErrors = getErrorsObject(payload?.errors, getErrorText);

  let error;
  if (fieldErrors?.base) {
    error = fieldErrors.base;
    delete fieldErrors.base;
  } else if (payload.error) {
    error = getErrorText(payload.error);
  }

  return { error, fieldErrors };
};

export const applyFieldErrors = (form, errors) => {
  if (form && errors) {
    const fieldsWithErrors = form.setErrors(errors);

    if (!fieldsWithErrors.length) return false;
  }

  return true;
};
