import { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './index.module.scss';
import { Provider } from './context';
import { useProviderValue } from './hooks';


const ModalProvider = forwardRef(({
  className,
  children,
  ...rest
}, ref) => {
  // Support legacy API
  const [modal, setModal] = useState(null);
  const [offset, setOffset] = useState(null);
  const providerValue = useProviderValue({ offset, setOffset, setModal });

  // Expose provider value for legacy layout
  useImperativeHandle(ref, () => providerValue, [providerValue]);

  const isLocked = offset !== null;
  const rootClassName = clsx(styles.root, className, { [styles.isLocked]: isLocked });

  return (
    <Provider value={providerValue}>
      <div
        {...rest}
        className={rootClassName}
      >
        {isLocked && <div style={{ marginTop: -offset }} />}
        {children}
      </div>
      {modal}
    </Provider>
  );
});

ModalProvider.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export { Consumer } from './context';
export default ModalProvider;
