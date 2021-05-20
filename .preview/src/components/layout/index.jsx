import styles from './index.module.scss';
import Logo from '../../../../packages/components/src/logo';

const Layout = ({ children }) => (
  <article className={styles.root}>
    <header className={styles.header}>
      <h1>@goodhood/insert-package-name preview</h1>
      <Logo />
    </header>
    {children}
  </article>
);

export default Layout;
