import PropTypes from 'prop-types';
import clsx from 'clsx';
import Markdown from '../markdown';
import styles from './index.module.scss';


const CookiesBanner = ({
  className,
  children,
  content,
  ...rest
}) => (
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

CookiesBanner.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  content: PropTypes.string.isRequired,
};

export default CookiesBanner;
