import React from 'react';
import PropTypes from 'prop-types';

import { SECTION_INVOICES, SECTION_EDIT_SUBSCRIPTION, SECTION_BILLING_ADDRESS } from '../constants';
import Action from '../action';

const PortalLink = ({
  section,
  onSessionGet,
  onClose,
  ...rest
}) => {
  const handleOpenLink = (instance, Chargebee) => {
    const sectionType = Chargebee.getPortalSections()[section];
    instance.setPortalSession(() => onSessionGet());

    const portal = instance.createChargebeePortal();
    portal.open({ close: onClose }, { sectionType });
  };

  return <Action {...rest} onCall={handleOpenLink} />;
};

PortalLink.propTypes = {
  section: PropTypes.oneOf([
    SECTION_INVOICES,
    SECTION_EDIT_SUBSCRIPTION,
    SECTION_BILLING_ADDRESS,
  ]).isRequired,

  onSessionGet: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default PortalLink;
