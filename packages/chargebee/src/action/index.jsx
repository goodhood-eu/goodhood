import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';
import { useOnUnmount } from './hooks';
import { invoke } from '../utils';

const Action = ({
  site,
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
      invoke(onCall, instanceRef.current, global.Chargebee);
    };

    node = <span {...rest} onClick={handleClick} />;
  }

  return (
    <>
      <Script url="https://js.chargebee.com/v2/chargebee.js" onLoad={handleLoad} />
      {node}
    </>
  );
};

Action.propTypes = {
  site: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onCall: PropTypes.func,
};

export default Action;
