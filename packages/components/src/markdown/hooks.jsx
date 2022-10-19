import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { stripOriginFromUrl } from 'nebenan-helpers/lib/routes';
import { invoke } from 'nebenan-helpers/lib/utils';

const EMAIL_LINK_REGEX = /^mailto:/;
const HTTP_LINK_REGEX = /^https?:/;
const EXTENSION_REGEX = /\.\w+$/;

export const useClickHandler = (onClick) => {
  const history = useHistory();

  return useCallback((event) => {
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

      if ((isLocal || isSameDomain) && !hasExtension) history.push(path);
      else global.open(href, undefined, 'noreferrer noopener');
    }

    console.log('This is called anytime you click on a markdown');

    invoke(onClick, event);
  }, [onClick, history]);
};
