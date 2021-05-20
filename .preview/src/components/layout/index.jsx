import styles from './index.module.scss';

const Layout = ({ children }) => (
  <article className={styles.root}>
    <div className={styles.content}>
      {children}
    </div>
    <div className={styles.panel}>
      <pre>stories!</pre>
    </div>
  </article>
);

export default Layout;
