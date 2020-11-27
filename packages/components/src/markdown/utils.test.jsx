import { assert } from 'chai';

import {
  BLOCKQUOTE_TOKEN,
  quotesToTokens,
  tokensToQuotes,
} from './utils';

const text1 = '> Hello';
const text2 = `
> This
> Is

> A block quote
`;

const text3 = `
> This
> Is

some text here too

> A block quote
`;

const tokens1 = `${BLOCKQUOTE_TOKEN} Hello`;
const tokens2 = `
${BLOCKQUOTE_TOKEN} This
${BLOCKQUOTE_TOKEN} Is

${BLOCKQUOTE_TOKEN} A block quote
`;

const tokens3 = `
${BLOCKQUOTE_TOKEN} This
${BLOCKQUOTE_TOKEN} Is

some text here too

${BLOCKQUOTE_TOKEN} A block quote
`;


describe('markdown/utils', () => {
  it('quotesToTokens', () => {
    assert.equal(quotesToTokens(text1), tokens1, 'simple text');
    assert.equal(quotesToTokens(text2), tokens2, 'multiline text');
    assert.equal(quotesToTokens(text3), tokens3, 'no leading space`');
  });

  it('tokensToQuotes', () => {
    assert.equal(tokensToQuotes(tokens1), text1, 'simple text');
    assert.equal(tokensToQuotes(tokens2), text2, 'multiline text');
    assert.equal(tokensToQuotes(tokens3), text3, 'no leading space`');
  });
});
