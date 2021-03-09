import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Script from 'react-load-script';
import { getUID } from 'nebenan-helpers/lib/calculations';
import { invoke } from 'nebenan-helpers/lib/utils';

import { getRequestOptions } from './utils';
import styles from './index.module.scss';

const defaultRender = (children) => children;


const Advertisement = ({ className, src, children, onRequest, onCheck, onLoad, ...props }) => {
  const [uid, setUID] = useState(null);
  const targetClass = `adn-${uid}`;
  const requestOptions = getRequestOptions(props);
  const renderFn = children || defaultRender;

  useEffect(() => {
    if (!uid || !window.adn || !props.id) return;
    const adOptions = { ...requestOptions, targetClass };
    window.adn.request(adOptions);
    invoke(onRequest, uid, adOptions);
  }, [uid]); // Intentionally only loads ad once

  const handlePreflight = (data) => {
    const hasAds = Boolean(data?.responseJSON?.adUnits[0]?.matchedAdCount);
    if (!hasAds) return; // There was an error or no matching ads

    const newUID = getUID();
    setUID(newUID);

    invoke(onCheck, newUID, data);
  };

  const handleLoad = () => {
    window.adn.useCookies(false);
    window.adn.useLocalStorage(false);
    const preflightOptions = { ...requestOptions, onSuccess: handlePreflight };
    window.adn.requestData(preflightOptions);
    invoke(onLoad, window.adn, preflightOptions);
  };

  if (!src) return null; // https://adn.nebenan.de/adn.js

  return (
    <>
      <Script url={src} onLoad={handleLoad} />
      {uid && renderFn(
        <aside className={cx(targetClass, styles.root, className)} />,
      )}
    </>
  );
};

Advertisement.propTypes = {
  className: PropTypes.string,

  src: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,

  userId: PropTypes.string,
  sessionId: PropTypes.string,
  env: PropTypes.string,

  id: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  categories: PropTypes.arrayOf(PropTypes.string),
  keyValues: PropTypes.array,

  options: PropTypes.object,

  children: PropTypes.func,
  onRequest: PropTypes.func,
  onCheck: PropTypes.func,
  onLoad: PropTypes.func,
};

export default Advertisement;
