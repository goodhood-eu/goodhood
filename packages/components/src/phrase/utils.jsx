export const PHRASE_EDITOR_URL = `//app.phrase.com/assets/in-context-editor/2.0/app.js?${Date.now()}`;
export const PHRASE_EDITOR_SESSION = 'phraseEditor';

const HOUR = 1000 * 60 * 60;
const TEN_YEARS = HOUR * 24 * 365 * 10;

const REGEX_FORMAT_DATE = /format_(?:date|time)/;
const REGEX_DATE_FORMAT = /(?:date|time)_format/;
const REGEX_FORCE_DISABLE = /phrase_disable$/;

export const shouldSkipKey = (key) => (
  REGEX_FORCE_DISABLE.test(key) || REGEX_FORMAT_DATE.test(key) || REGEX_DATE_FORMAT.test(key)
);

export const getPhraseEditorConfig = (projectId, forceLocale) => ({
  projectId,
  forceLocale,
  fullReparse: true,
});

export const getSessionUpdate = (expiring) => ({
  [PHRASE_EDITOR_SESSION]: Date.now() + (expiring ? HOUR : TEN_YEARS),
});

export const shouldLoad = (session) => {
  const ttl = session && session[PHRASE_EDITOR_SESSION];
  if (!Number.isInteger(ttl)) return false;
  return ttl - Date.now() > 0;
};

export const editorT = (t, key, ...args) => (
  shouldSkipKey(key) ? t(key, ...args) : `{{__phrase_${key}__}}`
);

export const createDebug = (session) => (shouldLoad(session) ? editorT : undefined);
