# `@goodhood/chargebee`

> React chargebee components

## Install

```
npm i @goodhood/chargebee
```

Install peer dependencies
```
npm i react // v16.x.x
npm i react-load-script // v0.x.x
npm i prop-types // v15.x.x
npm i @babel/runtime // v7.x.x
```

## Include:

```js
import { Action, PortalLink, Checkout } from '@goodhood/chargebee';
import PortalLik from '@goodhood/chargebee/lib/portal_link';
import Action from '@goodhood/chargebee/lib/action';
import Checkout from '@goodhood/chargebee/lib/checkout';
import { SECTION_INVOICES, SECTION_EDIT_SUBSCRIPTION, SECTION_BILLING_ADDRESS } from '@goodhood/chargebee/lib/constants';
```

# API

## Action
```jsx
import { Action } from '@goodhood/chargebee';

const App = () => (
  <Action
    {/* Your site name */}
    site="site-name"

    {/* Will be called on element click. Receives chargebee instance as an argument */}
    onCall={(chargebeeInstance, ChargebeeGlobalObject) => {}}
  />
);
```

## PortalLink
```jsx
import { PortalLink, SECTION_INVOICES } from '@goodhood/chargebee';

const App = () => (
  // Inherits Action component props
  <PortalLink
    {/* Section in the customer portal */}
    section={SECTION_INVOICES}

    {/* Should return a promise that resolves a portal session object */}
    onSessionGet={() => Promise.resolve({ id: '', token: '' })}

    {/* Will be called once the portal is closed by the end user */}
    onClose={() => {}}
  />
);
```

## Checkout
```jsx
import { Checkout } from '@goodhood/chargebee';

const App = () => (
  // Inherits Action component props
  <Checkout
    {/* Should return a promise, that will resolve a hosted page object */}
    onHostedPageGet={() => Promise.resolve({ id: '', url: '' })}

    {/* This function will be called once the portal is closed by the end user */}
    onClose={() => {}}

    {/* Will be called when a successful checkout happens. */}
    onSuccess={() => {}}

    {/* Will be called if the promise passed in onHostedPageGet causes an error */}
    onError={() => {}}
  />
);
```

# Development

## Preview

- `npm run start`
- Visit http://localhost:3000

## Add a new component

- Create `src/*/index.jsx`
  - Default exports will be re-exported with the chargebee name
  - Named exports will be re-exported as they are (watch out for collisions)
    ```js
      // src/chargebee/index.jsx
      export const PortalLink = () => {};
      export const Action = () => {};

      // usage
      import { PortalLink, Action } from '@goodhood/chargebee';
    ```
- Create `src/*/index.stories.jsx`
  - Storybook will take it up automatically
