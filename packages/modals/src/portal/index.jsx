import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

const Portal = ({ children }) => {
  const [node, setNode] = useState(null);

  useEffect(() => {
    setNode(document.body);
  }, []);

  return node ? createPortal(children, node) : null;
};

Portal.propTypes = {
  children: PropTypes.node,
};

export default Portal;
