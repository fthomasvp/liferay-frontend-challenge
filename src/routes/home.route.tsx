import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoadingIndicator from 'components/loading-indicator/loading-indicator.component';

const HomePage = React.lazy(() => import('pages/home/home.page'));
const NotFoundPage = React.lazy(() => import('pages/not-found/not-found.page'));

const AppRoutes = (): JSX.Element => {
  return (
    <Router>
      <React.Suspense fallback={<LoadingIndicator />}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export default AppRoutes;
