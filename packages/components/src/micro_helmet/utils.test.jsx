import { assert } from 'chai';
import { parseProps } from './utils';


describe('ui/micro_helmet/utils', () => {
  it('parseProps', () => {
    const props = {
      title: 'Title',
      description: 'Description',
      image: '/image.jpg',
      robots: 'follow',
      canonical: '/',
      url: 'nachbarschaftshilfe.nebenan.de',
      ogSiteName: 'Nachbarschaftshilfe',
    };

    const extraProps = {
      kim: 'chen',
      john: 'wick',
    };

    assert.deepEqual(
      parseProps({ ...props, ...extraProps }),
      {
        title: 'Title',
        description: 'Description',
        image: '/image.jpg',
        robots: 'follow',
        canonical: '/',
        url: 'nachbarschaftshilfe.nebenan.de',
        og_site_name: 'Nachbarschaftshilfe',
      },
      'omit unfamiliar props and map og_site_name',
    );

    assert.equal(parseProps({ title: 'test', titleTemplate: 'check %s' }).title, 'check test', 'insert title in template');
    assert.equal(parseProps({ defaultTitle: 'wop wop' }).title, 'wop wop', 'return default title');
  });
});
