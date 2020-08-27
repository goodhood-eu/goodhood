import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Markdown from 'nebenan-components/lib/markdown';
import Script from 'react-load-script';
import styles from './index.module.scss';


const CookiesBanner = ({
  className,
  children,
  content,
  GTMUrl,
  insertGTM,
  dismissed,
  onScriptCreate,
  ...rest
}) => {
  if (insertGTM) return <Script url={GTMUrl} onCreate={onScriptCreate} />;
  if (dismissed) return null;

  return (
    <article {...rest} className={clsx(className, styles.root)}>
      <div className={styles.wrapper}>
        <Markdown
          className={styles.text}
          text={content}
        />
        {children}
      </div>
    </article>
  );
};

CookiesBanner.defaultProps = {
  insertGTM: false,
  dismissed: false,
  GTMUrl: '',
};

CookiesBanner.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  content: PropTypes.string.isRequired,
  GTMUrl: PropTypes.string.isRequired,
  insertGTM: PropTypes.bool.isRequired,
  dismissed: PropTypes.bool.isRequired,
  onScriptCreate: PropTypes.func,
};

export default CookiesBanner;
