import {
  useRef,
  useImperativeHandle,
  forwardRef,
  ReactNode,
} from 'react';
import { Markdown } from '@goodhood/components';
import { Modal, ModalProps, ModalRef } from '../modal';
import styles from './index.module.scss';

export interface IllustrationModalProps extends ModalProps {
  image: string;
  title?: string;
  content?: string;
  button?: ReactNode;
  closeLabel?: string;
}

export type IllustrationRef = ModalRef;

export const IllustrationModal = forwardRef<IllustrationRef, IllustrationModalProps>(({
  persist = false,
  image,
  title,
  content,
  button,
  children,
  closeLabel,
  ...rest
}, ref) => {
  const modalRef = useRef<IllustrationRef>(null);
  useImperativeHandle<IllustrationRef, IllustrationRef>(ref, () => modalRef.current);

  let header;
  if (title) header = <header className="ui-card-section"><h1>{title}</h1></header>;

  let contentNode;
  if (content) contentNode = <Markdown text={content} />;

  let footer;
  if (!persist) {
    const handleClose = () => {
      modalRef.current?.close();
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
