import PropTypes from 'prop-types';

import * as sections from '../constants';
import {
  ChargebeeForwardOptions,
  PortalSectionsKeys,
  GetPortalSessionFunction,
  OnCallHandler,
} from '../types';
import Action from '../action';

type PortalLinkProps = {
  site: string;
  onSessionGet: GetPortalSessionFunction;
  onClose?: () => void;
  section?: PortalSectionsKeys;
} & Record<string, unknown>;

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
