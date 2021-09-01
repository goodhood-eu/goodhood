import PropTypes from 'prop-types';
import Action from '../action';
import { invoke } from '../utils';


const Checkout = ({
  onHostedPageGet,
  onLoaded,
  onStep,
  onClose,
  onSuccess,
  onError,
  ...rest
}) => {
  const handleCheckout = (instance) => {
    let isSuccess = false;

    instance.openCheckout({
      hostedPage: () => onHostedPageGet(),
      loaded: onLoaded,
      step: onStep,
      success: () => { isSuccess = true; },
      error: onError,
      close: () => {
        invoke(onClose);
        if (isSuccess) invoke(onSuccess);
      },
    });
  };

  return <Action {...rest} onCall={handleCheckout} />;
};

Checkout.propTypes = {
  onHostedPageGet: PropTypes.func.isRequired,
  onLoaded: PropTypes.func,
  onStep: PropTypes.func,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

export default Checkout;
