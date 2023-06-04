import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Loading } from 'components/Loading';

const HomePage = React.lazy(() => import('pages/Home'));
const NotFoundPage = React.lazy(() => import('pages/404'));

const AppRoutes = () => {
  return (
    <Router>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export default AppRoutes;
