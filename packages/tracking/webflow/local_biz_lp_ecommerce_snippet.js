// This snippet is used on this page https://unternehmensprofil.nebenan.de/ as an isolated snippet. It's not a part of any bundle

const elements = Array.from(document.querySelectorAll('a[data-ga-ecommerce]'));

const defaultPayload = {
  currency: 'EUR',
  item_list_name: 'biz_products',
};

const uniqueItems = new Set();
const items = elements.reduce((filteredItems, element) => {
  const item_name = element.dataset.gaEcommerce;
  const price = element.dataset.gaEcommercePrice;
  const identifier = `${item_name}-${price}`;

  if (item_name && price && !uniqueItems.has(identifier)) {
    uniqueItems.add(identifier);
    filteredItems.push({ item_name, price });
  }

  return filteredItems;
}, []);

window.addEventListener('load', () => {
  window.nebenanWebflowGA.sendEvent('view_item_list', {
    ecommerce: {
      ...defaultPayload,
      items,
    },
  });
});

elements.forEach((element) => {
  element.addEventListener('click', () => {
    const payload = {
      ecommerce: {
        ...defaultPayload,
        items: [
          {
            item_name: element.dataset.gaEcommerce,
            price: element.dataset.gaEcommercePrice,
          },
        ],
      },
    };

    if (Object.keys(payload).length) {
      window.nebenanWebflowGA.sendEvent('add_to_cart', payload);
    }
  });
});
