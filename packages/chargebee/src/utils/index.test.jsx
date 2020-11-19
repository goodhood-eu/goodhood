import { assert } from 'chai';
import sinon from 'sinon';
import {
  invoke,
} from './index';


describe('utils', () => {
  it('invoke', () => {
    const func = (first, second) => second;
    const spy = sinon.spy();
    invoke(spy);
    assert.isUndefined(invoke(), 'empty call does nothing');
    assert.isTrue(spy.calledOnce, 'called');
    assert.equal(invoke(func, 'a', 'b'), 'b', 'passes down args properly');
  });
});
