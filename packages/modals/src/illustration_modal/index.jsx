import { useRef, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@goodhood/components';
import Modal from '../modal';
import styles from './index.module.scss';

const IllustrationModal = forwardRef(({
  persist,
  image,
  title,
  content,
  button,
  children,
  closeLabel,
  ...rest
}, ref) => {
  const modalRef = useRef();
  useImperativeHandle(ref, () => modalRef.current);

  let header;
  if (title) header = <header className="ui-card-section"><h1>{title}</h1></header>;

  let contentNode;
  if (content) contentNode = <Markdown text={content} />;

  let footer;
  if (!persist) {
    const handleClose = () => {
      modalRef.current.close();
    };

    footer = (
      <footer className="ui-card-section ui-controls">
        {button}
        <span className="ui-link" onClick={handleClose}>{closeLabel}</span>
      </footer>
    );
  }

  return (
    <Modal {...rest} ref={modalRef} persist={persist}>
      <article className={`ui-card ${styles.root}`}>
        {header}
        <img src={image} alt="" />
        <div className="ui-card-section">
          {contentNode}
          {children}
        </div>
        {footer}
      </article>
    </Modal>
  );
});

IllustrationModal.defaultProps = {
  persist: false,
};

IllustrationModal.propTypes = {
  children: PropTypes.node,

  persist: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  button: PropTypes.node,
  closeLabel: PropTypes.string,
};

export default IllustrationModal;
