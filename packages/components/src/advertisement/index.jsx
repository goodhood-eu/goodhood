import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Script from 'react-load-script';
import { getUID } from 'nebenan-helpers/lib/calculations';
import { invoke } from 'nebenan-helpers/lib/utils';

import { getRequestOptions } from './utils';
import styles from './index.module.scss';

const Advertisement = ({ className, src, children, onRequest, onLoad, ...props }) => {
  const [uid, setUID] = useState(null);
  const targetClass = `adn-${uid}`;
  const options = getRequestOptions(props);

  // Known issue:
  // Using the callbacks will flash ad containers briefly when there are no ads to load
  // This is the desired behavior. Don't attempt to fix.
  const handleHideAd = () => setUID(null);

  // Intentionally only loads ad once
  useEffect(() => {
    if (!uid || !window.adn || !props.id) return;
    const requestOptions = {
      ...options,
      targetClass,
      onNoMatchedAds: handleHideAd,
      onError: handleHideAd,
    };
    window.adn.request(requestOptions);
    invoke(onRequest, uid, requestOptions);
  }, [uid]);

  const handleLoad = () => {
    window.adn.useCookies(false);
    window.adn.useLocalStorage(false);
    setUID(getUID());
    invoke(onLoad, window.adn);
  };

  // https://adn.nebenan.de/adn.js
  if (!src) return null;

  let content;
  if (uid) {
    content = <div className={cx(targetClass, styles.root, className)} />;
    if (children) content = children(content);
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
  onLoad: PropTypes.func,
};

export default Advertisement;
