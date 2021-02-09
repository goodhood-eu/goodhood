import { useState, useEffect } from 'react';
import pickBy from 'lodash/pickBy';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Script from 'react-load-script';
import { getUID } from 'nebenan-helpers/lib/calculations';
import { invoke } from 'nebenan-helpers/lib/utils';

import styles from './index.module.scss';

const AD_SCRIPT_CDN = 'https://cdn.adnuntius.com/adn.js';

const boolFilter = (value) => Boolean(value);

const Advertisement = ({
  className,

  userId,
  sessionId,
  env,

  id,
  width,
  height,
  categories,

  options,

  onRequest,
  onLoad,
}) => {
  const [uid, setUID] = useState(null);
  const targetClass = `adn-${uid}`;

  useEffect(() => {
    if (!uid || !window.adn || !id) return;

    const props = pickBy({
      userId,
      sessionId,
      env,
      auW: width,
      auH: height,
      c: categories,
    }, boolFilter);

    const requestOptions = {
      ...options,
      ...props,

      targetClass,
      auId: id,

      isolateFrame: true, // improves sandboxing, may cause issues with some ads
      useCookies: false, // redundant, added just in case
      protocol: 'https',
    };

    window.adn.request(requestOptions);
    invoke(onRequest, uid, requestOptions);
  }, [uid]); // Intentionally only loads ad once

  const handleLoad = () => {
    const newUID = getUID();
    setUID(newUID);

    window.adn.useCookies(false);
    window.adn.useLocalStorage(false);

    invoke(onLoad, newUID, window.adn);
  };

  return (
    <>
      <Script url={AD_SCRIPT_CDN} onLoad={handleLoad} />
      {uid && <aside className={cx(targetClass, styles.root, className)} />}
    </>
  );
};

Advertisement.propTypes = {
  className: PropTypes.string,

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

  options: PropTypes.object,

  onRequest: PropTypes.func,
  onLoad: PropTypes.func,
};

export default Advertisement;
