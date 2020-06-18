# `@goodhood/components`

> A collection of React Nebenan UI Components

## Preview

- `npm run start`
- Visit http://localhost:3000

## Usage

- (Requires `nebenan-ui-kit`: `import "nebenan-ui-kit/styles"`)
- Import styles globally: `import "@goodhood/components/styles.css"`
- eg. `import { Logo } from "@goodhood/components"`

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
    - Storybook will take it up automatically


