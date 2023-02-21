import PropTypes from 'prop-types';

import * as sections from '../constants';
import {
  ChargebeeForwardOptions,
  PortalSectionsKeys,
  GetPortalSessionFunction,
  OnCallHandler,
  VoidFunction,
} from '../types';
import Action, { ActionProps } from '../action';

type PortalLinkProps = Omit<ActionProps, 'onCall'> & {
  onSessionGet: GetPortalSessionFunction;
  section?: PortalSectionsKeys;
  onClose?: VoidFunction;
};

const PortalLink = ({
  section,
  onSessionGet,
  onClose,
  ...rest
}: PortalLinkProps) => {
  const handleOpenLink: OnCallHandler = (instance, Chargebee) => {
    let forwardOptions;

    if (section) {
      forwardOptions = {
        sectionType: Chargebee?.getPortalSections()[section],
      } as ChargebeeForwardOptions;
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
