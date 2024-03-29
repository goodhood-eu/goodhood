import escapeHtml from 'escape-html';

const REGEX_BLOCKQUITE = '(^|\\n)>(\\s)';
export const BLOCKQUOTE_TOKEN = '%BLOCKQUOTE%';

export const quotesToTokens = (string: string): string => (
  string.replace(new RegExp(REGEX_BLOCKQUITE, 'g'), `$1${BLOCKQUOTE_TOKEN}$2`)
);
export const tokensToQuotes = (string: string): string => (
  string.replace(new RegExp(BLOCKQUOTE_TOKEN, 'g'), '>')
);

export const sanitizeText = (text: string, withBlockquotes: boolean): string => {
  if (!withBlockquotes) return escapeHtml(text);
  return tokensToQuotes(escapeHtml(quotesToTokens(text)));
};
