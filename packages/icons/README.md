@goodhood/icons
===============

SVG icons to use in GoodHood projects. Uses the [nebenan design system](https://www.figma.com/file/PBPtYOEh3AvPce2CsnzcgL/%E2%AC%A1-Design-System?node-id=111%3A126) as single source of truth.

- [Preview](https://goodhood-eu.github.io/goodhood/packages/icons/preview/)

### How to:
```
npm install
npm start
```

### Usage

#### React Component
```jsx
import AddressBook from "@goodhood/icons/lib/large/address_book"

<AddressBook />
```

#### Raw SVG
```jsx
import addressBook from "@goodhood/icons/lib/large/address_book.svg"

<img src={addressBook} alt="" />
```

### How to update:
1. Found some icon in a screen design? Search it in the design system and note down name and group. (Can't find it? *Then do not add it!*)
2. Add an icon to the `src/*/` folder.
3. Check preview.
4. Create PR
5. Wait for reviews
6. Merge & publish
