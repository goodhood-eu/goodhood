import React from 'react';
import PropTypes from 'prop-types';

import * as sections from '../constants';
import Action from '../action';

const PortalLink = ({
  section,
  onSessionGet,
  onClose,
  ...rest
}) => {
  const handleOpenLink = (instance, Chargebee) => {
    const forwardOptions = {};

    if (section) {
      forwardOptions.sectionType = Chargebee.getPortalSections()[section];
    }

    instance.setPortalSession(() => onSessionGet());
    const portal = instance.createChargebeePortal();
    portal.open({ close: onClose }, forwardOptions);
  };

  return <Action {...rest} onCall={handleOpenLink} />;
};

PortalLink.propTypes = {
  section: PropTypes.oneOf(Object.values(sections)),
  onSessionGet: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default PortalLink;
