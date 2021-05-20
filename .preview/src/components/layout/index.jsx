import styles from './index.module.scss';
import Logo from '../../../../packages/components/src/logo';

const Layout = ({ children }) => (
  <article className={styles.root}>
    <header className={styles.header}>
      <Logo />
      <h1>@goodhood preview</h1>
    </header>
    <div className={styles.content}>
      {children}
    </div>
    <div className={styles.panel}>
      <pre>stories!</pre>
    </div>
  </article>
);

export default Layout;
