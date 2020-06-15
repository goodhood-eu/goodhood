/* eslint-disable react/no-unused-prop-types */

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'nebenan-helpers/lib/utils';
import MicroHelmetContext from './context';


class MicroHelmet extends PureComponent {
  componentWillUnmount() {
    invoke(this.removeProps);
  }

  render() {
    invoke(this.removeProps);
    this.removeProps = this.context.addProps(this.props);

    return null;
  }
}

MicroHelmet.contextType = MicroHelmetContext;

MicroHelmet.propTypes = {
  title: PropTypes.string,
  defaultTitle: PropTypes.string,
  titleTemplate: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  robots: PropTypes.string,
  canonical: PropTypes.string,
};

export { default as Provider } from './provider';
export default MicroHelmet;
