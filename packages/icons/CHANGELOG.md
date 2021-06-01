## v2.0.0 Changes

- Changed import path `@goodhood/icons/lib/16x16/*` -> `@goodhood/icons/lib/tiny/*`
- Changed import path `@goodhood/icons/lib/20x20/*` -> `@goodhood/icons/lib/small/*`
- Changed import path `@goodhood/icons/lib/24x24/*` -> `@goodhood/icons/lib/medium/*`
- Changed import path `@goodhood/icons/lib/28x28/*` -> `@goodhood/icons/lib/large/*`

Migrate script:
```bash
sed -i '' 's#@goodhood/icons/lib/16x16/#@goodhood/icons/lib/tiny/#g' **/*.jsx
sed -i '' 's#@goodhood/icons/lib/20x20/#@goodhood/icons/lib/small/#g' **/*.jsx
sed -i '' 's#@goodhood/icons/lib/24x24/#@goodhood/icons/lib/medium/#g' **/*.jsx
sed -i '' 's#@goodhood/icons/lib/28x28/#@goodhood/icons/lib/large/#g' **/*.jsx
```
