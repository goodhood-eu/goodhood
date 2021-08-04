import { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@goodhood/components';
import Modal from '../modal';

const Alert = forwardRef(({
  title,
  content,
  persist,
  children,
  closeLabel,
  ...rest
}, ref) => {
  const modalRef = useRef();
  useImperativeHandle(ref, () => modalRef.current);

  let header;
  if (title) header = <header className="ui-card-section"><h1>{title}</h1></header>;

  let footer;
  if (!persist) {
    const handleClose = () => {
      modalRef.current.close();
    };

    footer = (
      <footer className="ui-card-section">
        <span className="ui-link" onClick={handleClose}>{closeLabel}</span>
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
  children: PropTypes.node,
};

export default Alert;
