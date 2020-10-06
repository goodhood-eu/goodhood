import 'nebenan-ui-kit/styles.scss';
import './preview.scss';

const requireAll = (requireContext)  => requireContext.keys().map(requireContext);

requireAll(require.context('@/.storybook/', false, /preview-ssr\.js$/));
