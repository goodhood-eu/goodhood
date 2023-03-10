import PropTypes from 'prop-types';
import clsx from 'clsx';
import { marked } from 'marked';
import styles from './index.module.scss';

import { sanitizeText } from './utils';
import { ClickHandler, useClickHandler } from './hooks';
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

const options = { gfm: false } as const;

type RemainingHTMLAttributes = Omit<ComponentPropsWithoutRef<'span'>,
'className' | 'onClick'
>;

type Props = PropsWithChildren<{
  className?: string,
  inline: boolean,
  blockquotes: boolean,
  text: string,
  onClick?: ClickHandler,
} & RemainingHTMLAttributes>;

const Markdown = ({
  className: passedClassName,
  inline = false,
  blockquotes = false,
  text,
  children,
  onClick,
  ...cleanProps
}: Props) => {
  const handleClick = useClickHandler(onClick);
  const escapedText = sanitizeText(text, blockquotes);
  const safeContent = { __html: marked(escapedText, options) };
  const className = clsx(styles.root, passedClassName, { [styles.isInline]: inline });

  return (
    <span {...cleanProps} className={className} onClick={handleClick}>
      <span className={styles.content} dangerouslySetInnerHTML={safeContent} />
      {children}
    </span>
  );
};

Markdown.defaultProps = {
  inline: false,
  blockquotes: false,
};

Markdown.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  inline: PropTypes.bool.isRequired,
  blockquotes: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Markdown;
