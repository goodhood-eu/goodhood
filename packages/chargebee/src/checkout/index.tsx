import Action from '../action';
import { OnCallHandler, VoidFunction, HostedPage } from '../types';

type CheckoutProps = {
  site: string;
  onHostedPageGet: () => HostedPage;
  onLoaded?: VoidFunction;
  onStep?: VoidFunction;
  onClose?: VoidFunction;
  onSuccess?: VoidFunction;
  onError?: VoidFunction;
} & Record<string, unknown>;

const Checkout = ({
  onHostedPageGet,
  onLoaded,
  onStep,
  onClose,
  onSuccess,
  onError,
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
        onClose?.();
        onSuccess?.();
      },
    });
  };

  return <Action {...rest} onCall={handleCheckout} />;
};

export default Checkout;
