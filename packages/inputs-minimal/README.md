# `@goodhood/inputs-minimal`
Nebenan inputs package
- [Preview](https://goodhood-eu.github.io/goodhood/packages/inputs-minimal/preview/#/)

## Preview

- `npm run start`
- Visit http://localhost:3000

## Usage
- `import { TextField } from "@goodhood/inputs-minimal"`

## Add a new component

- Create `src/*/index.jsx`
  - Default exports will be re-exported with the components name
  - Named exports will be re-exported as they are (watch out for collisions)
      ```js
      // src/micro_helmet/index.jsx
      export const MicroHelmetProvider = 123;
      export default 666;
    
      // usage
      import { MicroHelmet, MicroHelmetProvider } from 'packages/inputs-minimal';
    ```
- Create `src/*/index.stories.jsx`
  - Preview will take it up automatically




