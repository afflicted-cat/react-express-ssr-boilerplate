import { ifElse, equals, always } from 'ramda';
import { globalPreloadActions } from 'common/preload';

const createPreloadActions = ifElse(equals(0), always(globalPreloadActions), always([]));

export const preloadData = (branch, store) => {
  return branch.map(({ route, match }, index) => {
    let preloadActions = createPreloadActions(index);

    if (route.preload !== undefined) {
      preloadActions = preloadActions.concat(route.preload);
    }

    const pendingActions = preloadActions.map(action => {
      return store.dispatch(action(match));
    });

    return Promise.all(pendingActions);
  });
};
