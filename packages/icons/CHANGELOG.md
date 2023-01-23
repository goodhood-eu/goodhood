## v2.0.0 Changes

- Changed import path `@goodhood/icons/lib/16x16/*` -> `@goodhood/icons/lib/tiny/*`
- Changed import path `@goodhood/icons/lib/20x20/*` -> `@goodhood/icons/lib/small/*`
- Changed import path `@goodhood/icons/lib/24x24/*` -> `@goodhood/icons/lib/medium/*`
- Changed import path `@goodhood/icons/lib/28x28/*` -> `@goodhood/icons/lib/large/*`

Migrate script:
```bash
sed -i '' 's#@goodhood/icons/lib/16x16/#@goodhood/icons/lib/tiny/#g' **/*.jsx **/*.tsx
sed -i '' 's#@goodhood/icons/lib/20x20/#@goodhood/icons/lib/small/#g' **/*.jsx **/*.tsx
sed -i '' 's#@goodhood/icons/lib/24x24/#@goodhood/icons/lib/medium/#g' **/*.jsx **/*.tsx
sed -i '' 's#@goodhood/icons/lib/28x28/#@goodhood/icons/lib/large/#g' **/*.jsx **/*.tsx
```

## v3.0.0 Changes

- Changed names of `Arrow-[Up/Down,Left,Right]` -> `Chevron-[Up/Down,Left,Right]`
- Added the actual `Arrow-[Up/Down,Left,Right]` icons

Migrate script:
```bash
sed -i '' 's#@goodhood/icons/lib/tiny/arrow_down#@goodhood/icons/lib/tiny/chevron_down#g' **/*.jsx **/*.tsx
sed -i '' 's#@goodhood/icons/lib/tiny/arrow_up#@goodhood/icons/lib/tiny/chevron_up#g' **/*.jsx **/*.tsx
sed -i '' 's#@goodhood/icons/lib/tiny/arrow_left#@goodhood/icons/lib/tiny/chevron_left#g' **/*.jsx **/*.tsx
sed -i '' 's#@goodhood/icons/lib/tiny/arrow_right#@goodhood/icons/lib/tiny/chevron_right#g' **/*.jsx **/*.tsx
```

## v4.0.0 Changes

- Changed names of (all) **small** and (one) **medium** `Arrow-[Up/Down,Left,Right]` -> `Chevron-[Up/Down,Left,Right]`

Migrate script:
```bash
sed -i '' 's#@goodhood/icons/lib/small/arrow_down#@goodhood/icons/lib/small/chevron_down#g' **/*.jsx **/*.tsx
sed -i '' 's#@goodhood/icons/lib/small/arrow_up#@goodhood/icons/lib/small/chevron_up#g' **/*.jsx **/*.tsx
sed -i '' 's#@goodhood/icons/lib/small/arrow_left#@goodhood/icons/lib/small/chevron_left#g' **/*.jsx **/*.tsx
sed -i '' 's#@goodhood/icons/lib/small/arrow_right#@goodhood/icons/lib/small/chevron_right#g' **/*.jsx **/*.tsx
sed -i '' 's#@goodhood/icons/lib/medium/arrow_down#@goodhood/icons/lib/medium/chevron_down#g' **/*.jsx **/*.tsx
```
