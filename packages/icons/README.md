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
import AddressBook from "@goodhood/icons/lib/28x28/AddressBook"

<AdressBook />
```

#### Raw SVG
```jsx
import addressBook from "@goodhood/icons/lib/28x28/AddressBook.svg"

<img src={addressBook} alt="" />
```

### How to update:
1. Add an icon to the `src/*/` folder.
2. Check that there are no duplicates and the name makes sense (follow other names as a guide).
3. Publish new version.
