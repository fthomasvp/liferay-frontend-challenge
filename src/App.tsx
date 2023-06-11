import React from 'react';

import { ClayIconSpriteContext } from '@clayui/icon';
import Spritemap from '@clayui/css/lib/images/icons/icons.svg';

import Pages from 'pages';

const App = () => {
  return (
    <ClayIconSpriteContext.Provider value={Spritemap}>
      <Pages />
    </ClayIconSpriteContext.Provider>
  );
};

export default App;
