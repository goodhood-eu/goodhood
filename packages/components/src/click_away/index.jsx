import { createContext, useCallback, useContext, useEffect, useRef } from 'react';

const context = createContext(() => {
  throw new Error('ClickAwayProvider not set up');
});

export const ClickAwayProvider = ({ children, ...rest }) => {
  const isInnerClickMapRef = useRef(new Map());
  const clickAwayHandlersRef = useRef(new Map());

  const handleClick = () => {
    const innerClickMap = isInnerClickMapRef.current;
    const handlersMap = clickAwayHandlersRef.current;

    innerClickMap.forEach((isInnerClick, id) => {
      if (isInnerClick) return;

      handlersMap.get(id)();
    });

    innerClickMap.forEach((_, id) => {
      innerClickMap.set(id, false);
    });
  };

  const register = useCallback((onClickAway) => {
    const innerClickMap = isInnerClickMapRef.current;
    const handlersMap = clickAwayHandlersRef.current;

    const id = Symbol('listener id');

    handlersMap.set(id, onClickAway);
    innerClickMap.set(id, false);

    const unregister = () => {
      clickAwayHandlersRef.current.delete(id);
      innerClickMap.delete(id);
    };

    const onInnerClick = () => {
      innerClickMap.set(id, true);
    };

    return { unregister, onInnerClick };
  }, []);

  return (
    <context.Provider value={register}>
      <div {...rest} onClick={handleClick}>{children}</div>
    </context.Provider>
  );
};

/**
 * @param onClickAway function to be called when user clicks outside the 'inner element'
 * @returns {(function(): void)|*} click handler that needs to be attached to the 'inner element'
 */
export const useClickAway = (onClickAway) => {
  const register = useContext(context);
  const onInnerClickRef = useRef(null);

  useEffect(() => {
    const { unregister, onInnerClick } = register(onClickAway);

    onInnerClickRef.current = onInnerClick;

    return unregister;
  }, [onClickAway]);

  return useCallback(() => {
    onInnerClickRef.current?.();
  }, []);
};
