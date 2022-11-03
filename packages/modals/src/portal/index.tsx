import { createPortal } from 'react-dom';
import { useEffect, useState, FC } from 'react';

export const Portal: FC = ({ children }) => {
  const [node, setNode] = useState<Nullable<HTMLElement>>(null);

  useEffect(() => {
    setNode(document.body);
  }, []);

  return node ? createPortal(children, node) : null;
};
