const VIEW_TYPES = Object.freeze({
  desktop: Object.freeze({ width: 1440, height: 900 }),
  tablet: Object.freeze({ width: 834, height: 1112 }),
  mobile: Object.freeze({ width: 390, height: 844 }),
});

function getViewType(name = 'desktop') {
  const viewport = VIEW_TYPES[name];
  if (!viewport) throw new Error(`Unknown view type "${name}". Choose: ${Object.keys(VIEW_TYPES).join(', ')}`);
  return viewport;
}

module.exports = { VIEW_TYPES, getViewType };

