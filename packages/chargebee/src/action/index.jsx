import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';
import { useOnUnmount } from './hooks';
import { invoke } from '../utils';

const Action = ({
  site,
  disabled,
  onClick,
  onCall,
  ...rest
}) => {
  const instanceRef = useRef();
  const [isReady, setReady] = useState();

  useOnUnmount(() => {
    if (instanceRef.current) instanceRef.current.logout();
  });

  const handleLoad = () => {
    try {
      // Try to get chargebee instance.
      // getInstance method throws an error if instance was not created
      instanceRef.current = global.Chargebee.getInstance();
    } catch (e) {
      instanceRef.current = global.Chargebee.init({ site });
    }

    setReady(true);
  };

  let node;
  if (isReady) {
    const handleClick = (event) => {
      invoke(onClick, event);
      if (!disabled) invoke(onCall, instanceRef.current, global.Chargebee);
    };

    const { onStep, ...cleanProps } = rest;

    node = <span {...cleanProps} onClick={handleClick} />;
  }

  return (
    <>
      <Script url="https://js.chargebee.com/v2/chargebee.js" onLoad={handleLoad} />
      {node}
    </>
  );
};

Action.defaultProps = {
  disabled: false,
};

Action.propTypes = {
  site: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  onCall: PropTypes.func,
};

export default Action;
