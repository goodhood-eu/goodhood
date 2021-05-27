import pkg from '@/package.json';
import styles from './index.module.scss';
import Logo from '../../../../packages/components/src/logo';

const Layout = ({ children }) => (
  <article className={styles.root}>
    <header className={styles.header}>
      <h1>{pkg.name} preview</h1>
      <Logo />
    </header>
    {children}
  </article>
);

export default Layout;
