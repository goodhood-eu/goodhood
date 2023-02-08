import Action from '../action';
import { OpenCheckoutOptions, OnCallHandler, VoidFunction, HostedPage } from '../types';

type CheckoutProps = {
  site: string;
  onHostedPageGet: () => HostedPage;
  onLoaded?: OpenCheckoutOptions['loaded'];
  onStep?: OpenCheckoutOptions['step'];
  onClose?: VoidFunction;
  onSuccess?: VoidFunction;
  onError?: VoidFunction;
} & Record<string, unknown>;

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
