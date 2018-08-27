import { compose, groupBy, ifElse, unless, values, map } from 'ramda';

const createEmptyAssets = bundle => ({ css: [], js: [bundle] });
const updateWebpackPath = path => (path.startsWith('/') ? path : `/${path}`);
const getExtension = filename => filename.split('.').pop();

const defaultToEmptyAssets = unless(Array.isArray, createEmptyAssets);
const groupAssets = compose(
  groupBy(getExtension),
  map(updateWebpackPath)
);

export const groupWebpackAssets = ifElse(Array.isArray, groupAssets, defaultToEmptyAssets);
export const groupManifestAssets = compose(
  groupWebpackAssets,
  values
);
