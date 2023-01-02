import { useReducer } from 'react';
import without from 'lodash/without';
import updeep from 'updeep';

const DEFAULT_STATE = {
  entities: {
    knobs: {},
    values: {},
  },
  knobs: [],
};

export const TYPE_REGISTER = 'register';
export const TYPE_UNREGISTER = 'unregister';
export const TYPE_UPDATE_VALUE = 'updateValue';

const reducer = (state, action) => {
  switch (action.type) {
    case TYPE_REGISTER: {
      const { id, defaultValue, ...options } = action.payload;

      const knob = { id, defaultValue, ...options };

      return updeep({
        entities: {
          knobs: { [id]: updeep.constant(knob) },
          values: { [id]: updeep.constant(defaultValue) },
        },
        knobs: (ids) => [...ids, id],
      }, state);
    }

    case TYPE_UNREGISTER: {
      const { id } = action.payload;

      return updeep({
        entities: {
          knobs: { [id]: updeep.omitted },
          values: { [id]: updeep.omitted },
        },
        knobs: (ids) => without(ids, id),
      }, state);
    }

    case TYPE_UPDATE_VALUE: {
      const { id, value } = action.payload;

      return updeep({
        entities: {
          values: { [id]: updeep.constant(value) },
        },
      }, state);
    }
  }
};

export const useKnobsState = () => useReducer(reducer, DEFAULT_STATE);
