# `@goodhood/components`

> A collection of React Nebenan UI Components

- [Preview](https://goodhood-eu.github.io/goodhood/packages/components/preview/)

## Preview

- `npm run start`
- Visit http://localhost:3000

## Usage

- Import `nebenan-ui-ki` globally
```scss
  @import "nebenan-ui-kit/styles"
```

- Import `scss` styles globally
```scss
  @import "@goodhood/components/styles"
```

- Import components e.g.
```js
  import { Logo } from "@goodhood/components";
```

## Add a new component

- Create `src/*/index.jsx`
    - Default exports will be re-exported with the components name
    - Named exports will be re-exported as they are (watch out for collisions)
        ```js
        // src/micro_helmet/index.jsx
        export const MicroHelmetProvider = 123;
        export default 666;
      
        // usage
        import { MicroHelmet, MicroHelmetProvider } from '@goodhood/components';
      ```
- Create `src/*/index.stories.jsx`
    - Preview will take it up automatically


