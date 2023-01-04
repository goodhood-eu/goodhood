import { createPortal } from 'react-dom';
import { useEffect, useState, FC, ReactNode } from 'react';

interface PortalProps {
  children?: ReactNode | ReactNode[];
}

export const Portal: FC<PortalProps> = ({ children }) => {
  const [node, setNode] = useState<Nullable<HTMLElement>>(null);

  useEffect(() => {
    setNode(document.body);
  }, []);

  return node ? createPortal(children, node) : null;
};
