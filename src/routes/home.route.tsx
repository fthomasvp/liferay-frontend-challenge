import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const HomePage = React.lazy(() => import('pages/home/home.page'));

const AppRoutes = (): JSX.Element => {
  return (
    <Router>
      <React.Suspense fallback={<p>Carregando...</p>}>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export default AppRoutes;
