import Action, { ActionProps } from '../action';
import { OpenCheckoutOptions, OnCallHandler, VoidFunction, HostedPage } from '../types';

type CheckoutProps = ActionProps & {
  onHostedPageGet: () => HostedPage;
  onLoaded?: OpenCheckoutOptions['loaded'];
  onStep?: OpenCheckoutOptions['step'];
  onSuccess?: VoidFunction;
  onClose?: VoidFunction;
  onError?: VoidFunction;
};

const Checkout = ({
  onHostedPageGet,
  onSuccess,
  onLoaded,
  onClose,
  onError,
  onStep,
  ...rest
}: CheckoutProps) => {
  const handleCheckout: OnCallHandler = (instance) => {
    let isSuccess = false;

    instance.openCheckout({
      hostedPage: () => onHostedPageGet(),
      loaded: onLoaded,
      step: onStep,
      success: () => { isSuccess = true; },
      error: onError,
      close: () => {
        onClose?.call?.(undefined);
        if (isSuccess) onSuccess?.call?.(undefined);
      },
    });
  };

  return <Action {...rest} onCall={handleCheckout} />;
};

export default Checkout;
