import React from 'react';
import PropTypes from 'prop-types';
import Action from '../action';


const ChargebeeCheckout = ({
  onHostedPageGet,
  onClose,
  onSuccess,
  onError,
  ...rest
}) => {
  const handleCheckout = (instance) => {
    let isSuccess = false;

    instance.openCheckout({
      hostedPage: () => onHostedPageGet(),
      success: () => { isSuccess = true; },
      error: onError,
      close: () => {
        if (onClose) onClose();
        if (isSuccess && onSuccess) onSuccess();
      },
    });
  };

  return <Action {...rest} onCall={handleCheckout} />;
};

ChargebeeCheckout.propTypes = {
  onHostedPageGet: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

export default ChargebeeCheckout;
