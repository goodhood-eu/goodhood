## v8.0.0 Changes
- Changed peer deps
  - `nebenan-ui-kit` -> v6

## v7.1.0 Changes
- Deprecated exports:
  - `COLOR_BASE`
  - `COLOR_ACTION`
  - `COLOR_DARK70`
  - `COLOR_SIGNAL`
  - `WEIGHT_S`
  - `WEIGHT_L`
  - `OPACITY_N`
  - `OPACITY_S`
  - `OPACITY_M`

## v7.0.2 Changes
- [CORE-11289] Update maplibre-gl to fix undefined sourceCaches errors

## v7.0.1 Changes
- [CORE-9769] Update to maplibre-gl v2

## v7.0.0 Changes
- Changed peer deps
  - -`@goodhood/icons`
  - -`clsx`
  - -`nebenan-react-hocs`
  - `nebenan-ui-kit` -> v5

## v6.0.0 Changes
- Bump `@goodhood/icons` peer dependency to `^2.0.0`

## v5.0.0 Changes
- Migrate to maplibre (no breaking changes in API)

## v4.0.0 Breaking changes
- Removed `popupContent`, `popupOffset`, `popupContent` props in <Marker /> component
- Added <Popup /> component

## v3.0.0 Breaking changes
- Added `Map: webGLError` prop

## v2.0.0 Breaking changes
- Removed `Map: defaultView` prop
- Removed `Map: defaultZoom` prop
- Added optional `Map: maxZoom` prop

## v1.0.0 Migration from nebenan-map
- Marker props changed:
```
Marker: tooltip -> Marker: popupContent
Marker: content -> Marker: children
```
- Popup was moved to marker:
```
MarkerPopup: content ->  Marker: popupContent
MarkerPopup: options ->  Marker: popupOffset
MarkerPopup: defaultOpen ->  Marker: popupDefaultState
```
