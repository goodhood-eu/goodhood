import { assert } from 'chai';
import sinon from 'sinon';
import { applyFieldErrors, getErrorsFromPayload } from './utils';

describe('network_form/utils', () => {
  describe('getErrorsFromPayload', () => {
    const getErrorText = (name) => `text-${name}`;

    context('payload has errors', () => {
      const PAYLOAD = {
        errors: {
          base: 'all-wrong',
          field: 'raw-text',
          otherField: ['required'],
        },
      };

      it('maps payload errors texts', () => {
        assert.nestedPropertyVal(
          getErrorsFromPayload(PAYLOAD, getErrorText),
          'fieldErrors.otherField',
          'text-required',
        );
      });

      it('maps raw payload errors', () => {
        assert.nestedPropertyVal(
          getErrorsFromPayload(PAYLOAD, getErrorText),
          'fieldErrors.field',
          'raw-text',
        );
      });

      it('maps raw base error', () => {
        assert.propertyVal(
          getErrorsFromPayload(PAYLOAD, getErrorText),
          'error',
          'all-wrong',
        );
      });
    });

    context('payload has error', () => {
      it('return empty fieldErrors and map error text', () => {
        assert.deepEqual(
          getErrorsFromPayload({ error: 'all-wrong' }, getErrorText),
          { error: 'text-all-wrong', fieldErrors: undefined },
        );
      });
    });

    context('payload has no kind of error', () => {
      it('return empty structure', () => {
        assert.deepEqual(
          getErrorsFromPayload(
            { someOtherStuff: 1 },
            getErrorText,
          ),
          { error: undefined, fieldErrors: undefined },
        );
      });
    });
  });

  describe('applyFieldErrors', () => {
    context('with form and errors', () => {
      it('sets errors on the form', () => {
        const setErrors = sinon.spy(() => []);

        applyFieldErrors({ setErrors }, { fieldA: 'my error' });

        assert.isTrue(setErrors.calledOnce);
        assert.deepEqual(setErrors.getCall(0).args[0], { fieldA: 'my error' });
      });

      it('returns true if any error matches a form field', () => {
        assert.isTrue(
          applyFieldErrors(
            { setErrors: () => ['fieldA'] },
            { fieldA: 'my error' },
          ),
        );
      });

      it('returns false if no error matches any form field', () => {
        assert.isFalse(
          applyFieldErrors(
            { setErrors: () => [] },
            { unknownField: 'unknown' },
          ),
        );
      });
    });

    it('returns true without form and errors', () => {
      assert.isTrue(
        applyFieldErrors(null, null),
      );
    });
  });
});
