import styles from './index.module.scss';

const Layout = ({ children }) => (
  <article className={styles.root}>
    <h1>Layout 🏄‍♀️</h1>
    {children}
  </article>
);

export default Layout;
