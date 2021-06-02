import { useMemo } from 'react';
import { uniqueId } from './utils';
import Context from './context';
import { TYPE_REGISTER, TYPE_UNREGISTER, TYPE_UPDATE_VALUE, useKnobsState } from './store';

const KnobsProvider = ({ children }) => {
  const [state, dispatch] = useKnobsState();

  const contextValue = useMemo(() => {
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

    return ({
      register: handleRegister,
      unregister: handleUnregister,
      updateValue: handleValueUpdate,
      ...state,
    });
  }, [state]);

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default KnobsProvider;
