import { useMemo } from 'react';
import { uniqueId } from './utils';
import Context from './context';
import { TYPE_REGISTER, TYPE_UNREGISTER, TYPE_UPDATE_VALUE, useKnobsState } from './store';

const KnobsProvider = ({ children }) => {
  const [state, dispatch] = useKnobsState();

  const handleRegister = (options) => {
    const id = uniqueId();
    dispatch({ type: TYPE_REGISTER, payload: { id, ...options } });

    return id;
  };

  const handleUnregister = (id) => {
    dispatch({ type: TYPE_UNREGISTER, payload: { id } });
  };

  const handleValueUpdate = (id, value) => {
    dispatch({ type: TYPE_UPDATE_VALUE, payload: { id, value } });
  };

  const value = useMemo(() => ({
    register: handleRegister,
    unregister: handleUnregister,
    updateValue: handleValueUpdate,
    values: state.values,
    knobs: state.knobs,
    knobIds: state.knobIds,
  }), [state]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default KnobsProvider;
