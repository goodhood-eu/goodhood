import { forwardRef, useRef, useImperativeHandle, ReactNode } from 'react';
import clsx from 'clsx';
import { Markdown } from '@goodhood/components';
import { Modal, ModalProps, ModalRef } from '../modal';

export interface ConfirmProps extends ModalProps {
  inverted?: boolean;
  locked?: boolean;
  content?: string;
  title?: string;
  button?: ReactNode;
  closeLabel?: string;
  cancelLabel?: string,
  confirmLabel?: string,
  contentClassName?: string,
  alternativeButton?: ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export type ConfirmRef = ModalRef;

export const Confirm = forwardRef<ConfirmRef, ConfirmProps>(({
  title,
  content,
  inverted = false,
  locked = false,
  children,
  cancelLabel,
  confirmLabel,
  contentClassName,

  onCancel,
  onConfirm,
  onUnmount,
  ...rest
}, ref) => {
  const modalRef = useRef<ConfirmRef>(null);
  useImperativeHandle<ConfirmRef, ConfirmRef>(ref, () => modalRef.current);
  const handledRef = useRef<boolean>(false);

  const handleCancel = () => {
    handledRef.current = true;
    modalRef.current?.close();
    onCancel?.();
  };

  const handleConfirm = () => {
    handledRef.current = true;
    modalRef.current?.close();
    onConfirm?.();
  };

  const handleUnmount = () => {
    if (!handledRef.current) onCancel?.();
    onUnmount?.();
  };

  let handler;
  if (!locked) handler = handleConfirm;

  let contentNode;
  if (content) contentNode = <Markdown text={content} />;

  let header;
  if (title) header = <header className="ui-card-section"><h1>{title}</h1></header>;

  let footer;
  if (inverted) {
    const className = clsx('ui-link', { 'is-disabled': locked });
    footer = (
      <footer className="ui-card-section ui-controls">
        <span className="ui-button ui-button-primary" onClick={handleCancel}>
          {cancelLabel}
        </span>
        <span className={className} onClick={handler}>{confirmLabel}</span>
      </footer>
    );
  } else {
    const className = clsx('ui-button ui-button-primary', { 'is-disabled': locked });
    footer = (
      <footer className="ui-card-section ui-controls">
        <span className={className} onClick={handler}>{confirmLabel}</span>
        <span className="ui-link" onClick={handleCancel}>{cancelLabel}</span>
      </footer>
    );
  }

  return (
    <Modal
      {...rest}
      ref={modalRef}
      onUnmount={handleUnmount}
    >
      <article className="ui-card">
        {header}
        <div className={clsx('ui-card-section', contentClassName)}>
          {contentNode}
          {children}
        </div>
        {footer}
      </article>
    </Modal>
  );
});
