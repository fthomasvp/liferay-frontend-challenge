import React from 'react';

import { ClayIconSpriteContext } from '@clayui/icon';
import Spritemap from '@clayui/css/lib/images/icons/icons.svg';

import AppRoutes from 'routes/home.route';

const App = (): JSX.Element => {
  return (
    <ClayIconSpriteContext.Provider value={Spritemap}>
      <AppRoutes />
    </ClayIconSpriteContext.Provider>
  );
};

export default App;
