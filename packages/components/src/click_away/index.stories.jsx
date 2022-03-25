import { ClickAwayProvider, useClickAway } from '@/src/click_away/index';
import { action } from '@root/.preview/src/modules/actions';

export default { title: 'ClickAway', component: ClickAwayProvider };


const Demo = () => {
  const onInnerClick = useClickAway(action('you clicked outside the inner element'));
  const onInnerInnerClick = useClickAway(action('you clicked outside the inner inner element'));

  return (
    <article>
      Click around and check the console!<br />
      This is the root element
      <div onClick={onInnerClick}>
        This is the inner element

        <div onClick={onInnerInnerClick}>
          This is the inner inner element
        </div>
      </div>
    </article>
  );
};

export const Default = () => (
  <ClickAwayProvider>
    <Demo />
  </ClickAwayProvider>
);

export const NoProviderSetup = () => (
  <Demo />
);
