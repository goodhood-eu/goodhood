import {createPortal} from 'react-dom';
import {ReactNode, useEffect, useState} from 'react';

type PortalProps = {
  children: ReactNode,
};

const Portal = ({ children }: PortalProps) => {
  const [node, setNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setNode(document.body);
  }, []);

  return node ? createPortal(children, node) : null;
};

export default Portal;
