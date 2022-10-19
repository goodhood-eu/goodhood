import React, {forwardRef, ReactNode, useImperativeHandle, useState} from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import {Provider} from './context';
import {useProviderValue} from './hooks';

type ModalProviderProps = {
  className: string,
  children: ReactNode,
  rest: any[],
};

const ModalProvider = forwardRef<unknown, ModalProviderProps>(({
  className,
  children,
  ...rest
}, ref) => {
  // Support legacy API
  const [modal, setModal] = useState<ReactNode | null>(null);
  const [offset, setOffset] = useState<number | null>(null);
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

export { Consumer } from './context';
export default ModalProvider;
