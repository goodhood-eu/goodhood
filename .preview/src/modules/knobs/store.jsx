import { useReducer } from 'react';
import { without } from 'lodash';

const DEFAULT_STATE = {
  knobs: {},
  values: {},
  knobIds: [],
};

export const TYPE_REGISTER = 'register';
export const TYPE_UNREGISTER = 'unregister';
export const TYPE_UPDATE_VALUE = 'updateValue';

const reducer = (state, action) => {
  switch (action.type) {
    case TYPE_REGISTER: {
      const { id, defaultValue, ...options } = action.payload;

      return {
        knobs: {
          ...state.knobs,
          [id]: { id, defaultValue, ...options },
        },
        knobIds: [...state.knobIds, id],
        values: {
          ...state.values,
          [id]: defaultValue,
        },
      };
    }

    case TYPE_UNREGISTER: {
      const { id } = action.payload;

      return {
        knobs: {
          ...state.knobs,
          [id]: undefined,
        },
        knobIds: without(state.knobIds, id),
        values: {
          ...state.values,
          [id]: undefined,
        },
      };
    }

    case TYPE_UPDATE_VALUE: {
      const { id, value } = action.payload;

      return {
        ...state,
        values: {
          ...state.values,
          [id]: value,
        },
      };
    }
  }
};

export const useKnobsState = () => useReducer(reducer, DEFAULT_STATE);
