// webpack replaces the original require function and stores it in __non_webpack_require__
// eslint-disable-next-line
export const dynamicRequire = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require;
