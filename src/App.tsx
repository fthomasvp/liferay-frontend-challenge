import React from 'react';

import { ClayIconSpriteContext } from '@clayui/icon';
import Spritemap from '@clayui/css/lib/images/icons/icons.svg';

import Routes from 'routes';

const App = (): JSX.Element => {
  return (
    <ClayIconSpriteContext.Provider value={Spritemap}>
      <Routes />
    </ClayIconSpriteContext.Provider>
  );
};

export default App;
