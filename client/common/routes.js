import * as React from 'react';
import { Route, Switch } from 'react-router';

import { commonRoutes } from 'features/common';

export const appRoutes = [...commonRoutes];

export function Routes() {
  return (
    <Switch>
      {appRoutes.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Switch>
  );
}
