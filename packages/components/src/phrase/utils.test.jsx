import { assert } from 'chai';

import {
  PHRASE_EDITOR_SESSION,
  shouldSkipKey,
  getPhraseEditorConfig,
  getSessionUpdate,
  shouldLoad,
  editorT,
  createDebug,
} from './utils';


describe('phrase/utils', () => {
  it('shouldSkipKey', () => {
    assert.isTrue(shouldSkipKey('woooo.key_phrase_disable'), 'force skip');
    assert.isTrue(shouldSkipKey('whatever.date_format'), 'date format');
    assert.isTrue(shouldSkipKey('whatever.time_format'), 'time format');
    assert.isTrue(shouldSkipKey('whatever.format_date'), 'format date');
    assert.isTrue(shouldSkipKey('whatever.format_time'), 'format time');
    assert.isFalse(shouldSkipKey('whatever.random'), 'not skipped');
  });

  it('getPhraseEditorConfig', () => {
    assert.isObject(getPhraseEditorConfig(), 'returns config');
  });

  it('getSessionUpdate', () => {
    assert.isObject(getSessionUpdate(), 'returns update');
    assert.isNumber(getSessionUpdate()[PHRASE_EDITOR_SESSION], 'expiration set');
  });

  it('shouldLoad', () => {
    assert.isFalse(shouldLoad(), 'undefined');
    assert.isFalse(shouldLoad(null), 'null');
    assert.isFalse(shouldLoad('kek'), 'string');
    assert.isFalse(shouldLoad([]), 'array');
    assert.isFalse(shouldLoad({}), 'object');
    assert.isFalse(shouldLoad(123), 'number');
    assert.isFalse(shouldLoad({ [PHRASE_EDITOR_SESSION]: 123 }), 'number too low');
    assert.isTrue(shouldLoad({ [PHRASE_EDITOR_SESSION]: Date.now() + 99999999999999999 }), 'active');
  });

  it('editorT', () => {
    const t = (key) => key.charAt(0);

    assert.equal(editorT(t, 'woooo.key_phrase_disable'), 'w', 'calls default t');
    assert.include(editorT(t, 'whatever'), 'whatever', 'outputs key as required');
  });

  it('createDebug', () => {
    assert.isUndefined(createDebug(), 'empty call');
    assert.isUndefined(createDebug(null), 'null');
    assert.isUndefined(createDebug({}), 'value not set');
    assert.isUndefined(createDebug({ [PHRASE_EDITOR_SESSION]: 123 }), 'value too low');
    assert.isFunction(createDebug({ [PHRASE_EDITOR_SESSION]: Date.now() + 99999999999999999 }), 'debugger created');
  });
});
