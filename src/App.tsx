import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ClayIconSpriteContext } from '@clayui/icon';
import spritemap from '@clayui/css/lib/images/icons/icons.svg';

import Dashboard from 'modules/pages/dashboard';

const App = (): JSX.Element => {
  return (
    <ClayIconSpriteContext.Provider value={spritemap}>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Router>
    </ClayIconSpriteContext.Provider>
  );
};

export default App;
