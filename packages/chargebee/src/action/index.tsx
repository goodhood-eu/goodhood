import React, { useRef, useState } from 'react';
import Script from 'react-load-script';
import { useOnUnmount } from './hooks';
import { ChargebeeInstance, OnCallHandler } from '../types';

type ActionProps = {
  site: string;
  onCall: OnCallHandler;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
} & Record<string, unknown>;

const Action = ({
  disabled = false,
  onClick,
  onCall,
  site,
  ...rest
}: ActionProps) => {
  const instanceRef = useRef<ChargebeeInstance>();
  const [isReady, setReady] = useState<boolean>(false);

  useOnUnmount(() => {
    if (instanceRef.current) instanceRef.current.logout();
  });

  const handleLoad = () => {
    try {
      // Try to get chargebee instance.
      // getInstance method throws an error if instance was not created
      instanceRef.current = global.Chargebee.getInstance();
    } catch (e) {
      instanceRef.current = global.Chargebee.init({ site, enableGTMTracking: true });
    }

    setReady(true);
  };

  let node;
  if (isReady) {
    const handleClick: React.MouseEventHandler = (event) => {
      onClick?.call?.(undefined, event);
      if (!disabled) {
        onCall?.call?.(
          undefined,
          instanceRef.current as ChargebeeInstance,
          global.Chargebee,
        );
      }
    };

    node = <span role="button" tabIndex={0} {...rest} onClick={handleClick} />;
  }

  return (
    <>
      <Script url="https://js.chargebee.com/v2/chargebee.js" onLoad={handleLoad} />
      {node}
    </>
  );
};

export default Action;
