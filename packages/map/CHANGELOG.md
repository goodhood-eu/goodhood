## v2.0.0 Breaking changes
- Removed `Map: defaultView` prop
- Replaced `Map: defaultZoom` prop with `Map: maxZoom` prop

## v1.0.0 Migration from nebenan-map
- Marker props changed:
`Marker: tooltip -> Marker: popupContent`
`Marker: content -> Marker: children`

- Popup was moved to marker:
`MarkerPopup: content ->  Marker: popupContent`
`MarkerPopup: options ->  Marker: popupOffset`
`MarkerPopup: defaultOpen ->  Marker: popupDefaultState`
