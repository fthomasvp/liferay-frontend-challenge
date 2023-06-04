import { useContext } from 'react';

import { SearchBarContext } from 'context/search-bar/search-bar.context';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSearchBarContext = () => {
  const context = useContext(SearchBarContext);

  if (context === undefined) {
    throw new Error('Context was used outside of its Provider');
  }

  return context;
};
