import { useState, useEffect, useRef } from 'react';
import pickBy from 'lodash/pickBy';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import cx from 'clsx';
import Script from 'react-load-script';
import { getUID } from 'nebenan-helpers/lib/calculations';
import { invoke } from 'nebenan-helpers/lib/utils';

import styles from './index.module.scss';

const AD_SCRIPT_CDN = 'https://cdn.adnuntius.com/adn.js';
const AD_UPDATE_DELAY = 500;

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
  onUpdate,
}) => {
  const [uid, setUID] = useState(null);
  const ref = useRef(null);
  const visible = useRef(null);
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

    const handleUpdate = debounce(() => {
      const newVisible = ref.current.offsetHeight > 1;
      if (visible.current === newVisible) return;
      visible.current = newVisible;
      invoke(onUpdate, newVisible);
    }, AD_UPDATE_DELAY);

    const observer = new ResizeObserver(handleUpdate);
    observer.observe(ref.current);

    return () => {
      handleUpdate.cancel();
      observer.disconnect();
    };
  }, [uid]); // Intentionally only loads ad once

  const handleLoad = () => {
    const newUID = getUID();
    setUID(newUID);

    window.adn.useCookies(false);
    window.adn.useLocalStorage(false);

    invoke(onLoad, newUID, window.adn);
  };

  return (
    <div className={cx(styles.root, className)} ref={ref}>
      <Script url={AD_SCRIPT_CDN} onLoad={handleLoad} />
      {uid && <aside className={targetClass} />}
    </div>
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
  onUpdate: PropTypes.func,
};

export default Advertisement;
