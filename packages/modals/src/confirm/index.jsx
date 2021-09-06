import { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Markdown } from '@goodhood/components';
import Modal from '../modal';

const Confirm = forwardRef(({
  title,
  content,
  inverted,
  locked,
  children,
  cancelLabel,
  confirmLabel,
  contentClassName,

  onCancel,
  onConfirm,
  onUnmount,
  ...rest
}, ref) => {
  const modalRef = useRef();
  const handledRef = useRef(false);
  useImperativeHandle(ref, () => modalRef.current);

  const handleCancel = () => {
    handledRef.current = true;
    modalRef.current.close();
    onCancel?.();
  };

  const handleConfirm = () => {
    handledRef.current = true;
    modalRef.current.close();
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

Confirm.defaultProps = {
  inverted: false,
  locked: false,
};

Confirm.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  inverted: PropTypes.bool.isRequired,
  locked: PropTypes.bool.isRequired,
  children: PropTypes.node,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  contentClassName: PropTypes.string,

  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onUnmount: PropTypes.func,
};

export default Confirm;
