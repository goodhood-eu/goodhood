import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';


const isServer = typeof window === 'undefined';
let node;
if (!isServer) node = document.body;

const Portal = ({ children }) => {
  if (isServer) return null;
  return createPortal(children, node);
};

Portal.propTypes = {
  children: PropTypes.node,
};

export default Portal;
