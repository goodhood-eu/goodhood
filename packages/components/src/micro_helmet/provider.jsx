import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { invoke, bindTo } from 'nebenan-helpers/lib/utils';

import context from './context';
import { parseProps } from './utils';

const Provider = context.Provider;

const BROWSER_UPDATE_LIMIT = 300;
const isServerEnv = (
  typeof process !== 'undefined' && process && process.versions && process.versions.node
);

class MicroHelmetProvider extends PureComponent {
  constructor(props) {
    super(props);

    bindTo(
      this,
      'getProps',
      'addProps',
    );

    this.propsArray = [];
    this.staticContext = this.getDefaultContext();

    if (props.context) props.context.getProps = this.getProps;
  }

  componentDidMount() {
    this.updateBrowserTitle = debounce(this.updateBrowserTitle, BROWSER_UPDATE_LIMIT);
  }

  componentWillUnmount() {
    invoke(this.updateBrowserTitle.cancel);
  }

  getDefaultContext() {
    const { addProps } = this;
    return { addProps };
  }

  getProps() {
    return parseProps(Object.assign({}, ...this.propsArray));
  }

  addProps(props) {
    this.propsArray.push(props);
    this.updateBrowserTitle();

    return () => {
      this.propsArray = this.propsArray.filter((item) => item !== props);
      this.updateBrowserTitle();
    };
  }

  updateBrowserTitle() {
    if (isServerEnv) return;

    const { title } = this.getProps();
    if (title && title !== document.title) document.title = title;
  }

  render() {
    return <Provider value={this.staticContext}>{this.props.children}</Provider>;
  }
}

MicroHelmetProvider.propTypes = {
  context: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default MicroHelmetProvider;
