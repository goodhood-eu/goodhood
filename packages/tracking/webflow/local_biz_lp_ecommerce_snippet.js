const elements = Array.from(document.querySelectorAll('a[data-ga-ecommerce]'));

const defaultPayload = {
  currency: 'EUR',
  item_list_name: 'biz_products',
};

const uniqueItems = new Set();
const items = elements.reduce((filteredItems, element) => {
  const item_name = element.dataset.gaEcommerce;
  const price = parseFloat(element.dataset.gaEcommercePrice);
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
    const item_name = element.dataset.gaEcommerce;
    const price = parseFloat(element.dataset.gaEcommercePrice);
    if (item_name && price) {
      const payload = {
        ecommerce: {
          ...defaultPayload,
          value: price,
          items: [
            {
              item_name,
              price,
            },
          ],
        },
      };

      window.nebenanWebflowGA.sendEvent('add_to_cart', payload);
    }
  });
});
