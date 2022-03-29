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

## v3.0.0 Changes

- Changed names of `Arrow-[Up/Down,Left,Right]` -> `Chevron-[Up/Down,Left,Right]`
- Added the actual `Arrow-[Up/Down,Left,Right]` icons

Migrate script:
```bash
sed -i '' 's#@goodhood/icons/lib/tiny/Arrow_Down#@goodhood/icons/lib/tiny/Chevron_Down#g' **/*.jsx
sed -i '' 's#@goodhood/icons/lib/tiny/Arrow_Up#@goodhood/icons/lib/tiny/Chevron_Up#g' **/*.jsx
sed -i '' 's#@goodhood/icons/lib/tiny/Arrow_Left#@goodhood/icons/lib/tiny/Chevron_Left#g' **/*.jsx
sed -i '' 's#@goodhood/icons/lib/tiny/Arrow_Right#@goodhood/icons/lib/tiny/Chevron_Right#g' **/*.jsx
```
