import React, { useContext } from 'react';

import { SearchBarContext } from 'contexts/search-bar/search-bar.context';

export const useSearchBarContext = () => {
  const context = useContext(SearchBarContext);

  if (context === undefined) {
    throw new Error('Context was used outside of its Provider');
  }

  return context;
};
