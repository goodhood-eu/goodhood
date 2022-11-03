import {
  forwardRef,
  useRef,
  useImperativeHandle,
  ReactNode,
  ReactElement,
} from 'react';
import clsx from 'clsx';
import { Markdown } from '@goodhood/components';
import { Modal, ModalProps, ModalRef } from '../modal';

export interface AlertProps extends Omit<ModalProps, 'title'> {
  title?: ReactNode;
  content?: string;
  button?: ReactNode;
  alternativeButton?: ReactElement;
  closeLabel?: string;
}

export type AlertRef = ModalRef;

export const Alert = forwardRef<AlertRef, AlertProps>(({
  title,
  content,
  children,
  closeLabel,
  button,
  alternativeButton,
  persist = false,
  ...rest
}, ref) => {
  const modalRef = useRef<AlertRef>(null);
  useImperativeHandle<AlertRef, AlertRef>(ref, () => modalRef.current);

  let header;
  if (title) header = <header className="ui-card-section"><h1>{title}</h1></header>;

  let footer: Nullable<ReactNode>;
  if (!persist) {
    const footerClassName = clsx('ui-card-section', { 'ui-controls': button });

    const handleClose = () => {
      modalRef.current?.close();
    };

    let alternativeAction: ReactNode;
    if (alternativeButton) {
      alternativeAction = alternativeButton;
    } else {
      alternativeAction = <span className="ui-link" onClick={handleClose}>{closeLabel}</span>;
    }

    footer = (
      <footer className={footerClassName}>
        {alternativeAction}
        {button}
      </footer>
    );
  }

  let contentNode;
  if (content) contentNode = <Markdown text={content} />;

  return (
    <Modal {...rest} ref={modalRef} persist={persist}>
      <article className="ui-card">
        {header}
        <div className="ui-card-section">
          {contentNode}
          {children}
        </div>
        {footer}
      </article>
    </Modal>
  );
});
