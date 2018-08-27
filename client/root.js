import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';

import { Routes } from 'common/routes';

function RootApp() {
  return (
    <Fragment>
      <Helmet>
        <title>Title from Root</title>
      </Helmet>
      <Routes />
    </Fragment>
  );
}

export const Root = hot(module)(RootApp);
