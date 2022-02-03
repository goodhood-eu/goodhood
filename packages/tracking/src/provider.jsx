import { forwardRef, useContext, useImperativeHandle } from 'react';
import { invoke } from 'nebenan-helpers/lib/utils';
import Context from './context';

const DEFAULT_TRANSFORM = (payload) => payload;

const Provider = forwardRef(({
  transform = DEFAULT_TRANSFORM,
  onEvent,
  children,
  ...payload
}, ref) => {
  const context = useContext(Context);

  const handleTrack = (rawPayload) => {
    const eventPayload = transform({
      ...payload,
      ...rawPayload,
    });

    invoke(onEvent, eventPayload);
    invoke(context.track, eventPayload);
  };

  useImperativeHandle(ref, () => ({
    track: handleTrack,
  }));

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    payload,
    track: handleTrack,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
});

export default Provider;
