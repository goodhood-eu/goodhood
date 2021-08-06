# `@goodhood/modals`

> React modal components
 
- [Preview](https://goodhood-eu.github.io/goodhood/packages/modals/preview/)


## Install

```
npm i @goodhood/modals
```

Install peer dependencies
```
npm i react // v16.x.x
npm i prop-types // v15.x.x
npm i @babel/runtime // v7.x.x
npm i @goodhood/components // >= v6.x.x
npm i nebenan-ui-kit // >= v5.x.x
npm i nebenan-helpers // >= v5.x.x
```

Configurate module
```js
import { configure } from '@goodhood/modals';

configure({
  track: // track function which will be called on modal open and close event
});
```

## Import:

```js
import Modal, { Alert, configure } from '@goodhood/modals';
```

# API

## Modal
```js
import { ModalProvider } from '@goodhood/modals';

const App = () => (
  /* Imperative API:
  - setModal(modalComponent): support legacy API for showing modals via function call
  - lock(): locks window scroll
  - unlock(): unlocks window scroll */
  <ModalProvider ref={ref}>
    {/* All modals should be placed inside modal provider */}
  </ModalProvider>
);
```

## Modal
```jsx
import { ModalProvider, Modal } from '@goodhood/modals';

const App = () => {
  const [isActive, setAcive] = useState();

  return (
    <ModalProvider>
      <span onClick={() => setAcive(true)}>Open modal</span>

      {isActive && (
        <Modal
          {/* Overlay class attribute */}
          className="string"

          {/* Content class attribute */}
          bodyClassName=""

          {/* Prevent modal from closing */}
          persist={true/false}

          {/* Stick modal to the top */}
          staticPosition={true/false}

          {/* Handler to close modal */}
          onClose={() => setAcive(false)}

          {/* Called on unmount */}
          onUnmount={() => {}}
        >
          {/* Modal content */}
        </Modal>
      )}
    </ModalProvider>
  );
};
```

## Alert
```jsx
import { ModalProvider, Alert } from '@goodhood/modals';

const App = () => (
  <ModalProvider>
    <Alert
      {/* Inherits props from <Modal /> */}

      {/* Title in the header */}
      title="string"

      {/* Content, supports markdown syntax */}
      content="string"

      {/* Text for close link in the footer */}
      closeLabel="string"
    >
      {/* Alert content */}
    </Alert>
  </ModalProvider>
);
```

## Confirm
```jsx
import { ModalProvider, Confirm } from '@goodhood/modals';

const App = () => (
  <ModalProvider>
    <Confirm
      {/* Inherits props from <Modal /> */}

      {/* Title in the header */}
      title="string"

      {/* Content, supports markdown syntax */}
      content="string"

      {/* Text for decline button */}
      cancelLabel="string"

      {/* Text for confirm button */}
      confirmLabel="string"

      {/* Lock buttons */}
      locked={true/false}

      {/* Invert buttons */}
      inverted={true/false}

      {/* Called on decline, DO NOT CONFUSE WITH onClose */}
      onCancel={() => {}}

      {/* Called on confirm */}
      onConfirm={() => {}}
    >
      {/* Confirm content */}
    </Confirm>
  </ModalProvider>
);
```

## IllustrationModal
```jsx
import { ModalProvider, IllustrationModal } from '@goodhood/modals';

const App = () => (
  <ModalProvider>
    <IllustrationModal
      {/* Inherits props from <Modal /> */}

      {/* Title in the header */}
      title="string"

      {/* Content, supports markdown syntax */}
      content="string"

      {/* Text for close link in the footer */}
      closeLabel="string"

      {/* Image url */}
      image="https://images.com/image.jpg"

      {/* Button node in the footer */}
      button={<button>Hello</button>}
    >
      {/* IllustrationModal content */}
    </IllustrationModal>
  </ModalProvider>
);
```

## ScrollableModal
```jsx
import { ModalProvider, ScrollableModal } from '@goodhood/modals';

const App = () => (
  <ModalProvider>
    <ScrollableModal
      {/* Inherits props from <Modal /> */}

      {/* Header node */}
      header={<header class="ui-card-section">Title</header>}

      {/* Footer node */}
      footer={<footer class="ui-card-section">Footer</footer>}
    >
      {/* ScrollableModal content */}
    </ScrollableModal>
  </ModalProvider>
);
```

# Development

## Preview

- `yarn start`
- Visit http://localhost:3000

## Add a new component

- Create `src/*/index.jsx`
  - Default exports will be re-exported with the map name
  - Named exports will be re-exported as they are (watch out for collisions)
    ```js
      // src/map/index.jsx
      export const ModalType = 123;
      export Modal 666;

      // usage
      import { Modal, ModalType } from '@goodhood/modals';
    ```
- Create `src/*/index.stories.jsx`
  - Preview will take it up automatically
