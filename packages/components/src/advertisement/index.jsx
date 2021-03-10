import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Script from 'react-load-script';
import { getUID } from 'nebenan-helpers/lib/calculations';
import { invoke } from 'nebenan-helpers/lib/utils';

import { getRequestOptions } from './utils';
import styles from './index.module.scss';

const Advertisement = ({ className, src, children, onRequest, onCheck, onLoad, ...props }) => {
  const [uid, setUID] = useState(null);
  const targetClass = `adn-${uid}`;
  const requestOptions = getRequestOptions(props);

  // Intentionally only loads ad once
  useEffect(() => {
    if (!uid || !window.adn || !props.id) return;
    const adOptions = { ...requestOptions, targetClass };
    window.adn.request(adOptions);
    invoke(onRequest, uid, adOptions);
  }, [uid]);

  const handlePreflight = (data) => {
    const hasAds = Boolean(data?.responseJSON?.adUnits[0]?.matchedAdCount);
    // There was an error or no matching ads
    if (!hasAds) return;

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

  // https://adn.nebenan.de/adn.js
  if (!src) return null;

  let content;
  if (uid) {
    const container = <div className={cx(targetClass, styles.root, className)} />;
    content = children ? children(container) : container;
  }

  return (
    <>
      <Script url={src} onLoad={handleLoad} />
      {content}
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
