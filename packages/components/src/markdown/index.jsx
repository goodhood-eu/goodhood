import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import omit from 'lodash/omit';
import clsx from 'clsx';
import marked from 'marked';
import { invoke } from 'nebenan-helpers/lib/utils';
import { stripOriginFromUrl } from 'nebenan-helpers/lib/routes';
import { historyPropTypes } from 'nebenan-react-hocs/lib/history';
import styles from './index.module.scss';

import { sanitizeText } from './utils';

const EMAIL_LINK_REGEX = /^mailto:/;
const HTTP_LINK_REGEX = /^https?:/;
const EXTENSION_REGEX = /\.\w+$/;

const options = { gfm: false };

class Markdown extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { target } = event;
    const href = target.getAttribute('href');
    const isLink = target.tagName === 'A';
    const isEmail = EMAIL_LINK_REGEX.test(href);
    const isLocal = !HTTP_LINK_REGEX.test(href);
    const hasExtension = EXTENSION_REGEX.test(href);

    if (isLink && href && !isEmail) {
      event.preventDefault();
      const isSameDomain = href.startsWith(global.location.origin);
      const path = stripOriginFromUrl(href, global.location.origin);

      if ((isLocal || isSameDomain) && !hasExtension) this.props.history.push(path);
      else global.open(href, undefined, 'noreferrer noopener');
    }

    invoke(this.props.onClick, event);
  }

  render() {
    const { inline, blockquotes, text, children } = this.props;
    const className = clsx(styles.root, this.props.className, { [styles.isInline]: inline });
    const cleanProps = omit(
      this.props,
      ...Object.keys(historyPropTypes),
      'children',
      'text',
      'inline',
      'blockquotes',
    );
    const escapedText = sanitizeText(text, blockquotes);
    const safeContent = { __html: marked(escapedText, options) };

    return (
      <span {...cleanProps} className={className} onClick={this.handleClick}>
        <span className={styles.content} dangerouslySetInnerHTML={safeContent} />
        {children}
      </span>
    );
  }
}

Markdown.defaultProps = {
  inline: false,
  blockquotes: false,
};

Markdown.propTypes = {
  ...historyPropTypes,
  className: PropTypes.string,
  children: PropTypes.node,
  inline: PropTypes.bool.isRequired,
  blockquotes: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default withRouter(Markdown);
