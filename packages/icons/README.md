@goodhood/icons
===============

SVG icons to use in GoodHood projects

### How to:
```
npm install
npm start
```

### Usage

#### React Component
```jsx
import AddressBook from "@goodhood/icons/lib/28x28/address_book"

<AddressBook />
```

#### Raw SVG
```jsx
import addressBook from "@goodhood/icons/lib/28x28/address_book.svg"

<img src={addressBook} alt="" />
```

### How to update:
1. Add an icon to the `src/*/` folder.
1. Check that there are no duplicates and the name makes sense (follow other names as a guide).
1. Check preview.
1. Publish new version.
