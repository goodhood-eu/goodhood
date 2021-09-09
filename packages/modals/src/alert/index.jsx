import { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Markdown } from '@goodhood/components';
import Modal from '../modal';

const Alert = forwardRef(({
  title,
  content,
  persist,
  children,
  closeLabel,
  button,
  alternativeButton,
  ...rest
}, ref) => {
  const modalRef = useRef();
  useImperativeHandle(ref, () => modalRef.current);

  let header;
  if (title) header = <header className="ui-card-section"><h1>{title}</h1></header>;

  let footer;
  if (!persist) {
    const footerClassName = clsx('ui-card-section', { 'ui-controls': button });

    const handleClose = () => {
      modalRef.current.close();
    };

    let alternativeAction;
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

Alert.defaultProps = {
  persist: false,
};

Alert.propTypes = {
  title: PropTypes.node,
  content: PropTypes.string,
  closeLabel: PropTypes.string,
  persist: PropTypes.bool.isRequired,
  button: PropTypes.node,
  alternativeButton: PropTypes.node,
  children: PropTypes.node,
};

export default Alert;
