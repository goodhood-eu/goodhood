import { MouseEvent, useCallback } from 'react';
import { useHistory } from 'react-router';
import { stripOriginFromUrl } from 'nebenan-helpers/lib/routes';

const EMAIL_LINK_REGEX = /^mailto:/;
const HTTP_LINK_REGEX = /^https?:/;
const EXTENSION_REGEX = /\.\w+$/;

export type ClickHandler = (event: MouseEvent<HTMLElement>) => void;

export const useClickHandler = (onClick?: ClickHandler): ClickHandler => {
  const history = useHistory();

  return useCallback((event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const href = target.getAttribute('href');
    const isLink = target.tagName === 'A';
    const isEmail = href && EMAIL_LINK_REGEX.test(href);
    const isLocal = href && !HTTP_LINK_REGEX.test(href);
    const hasExtension = href && EXTENSION_REGEX.test(href);

    if (isLink && href && !isEmail) {
      event.preventDefault();
      const isSameDomain = href.startsWith(global.location.origin);
      const path = stripOriginFromUrl(href, global.location.origin);

      if ((isLocal || isSameDomain) && !hasExtension) history.push(path);
      else global.open(href, undefined, 'noreferrer noopener');
    }

    if (typeof onClick === 'function') onClick(event);
  }, [onClick, history]);
};
