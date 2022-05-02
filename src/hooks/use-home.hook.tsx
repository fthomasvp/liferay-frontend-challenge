import { useContext } from 'react';

import { HomeContext } from 'contexts/home/home.context';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHomeContext = () => {
  const context = useContext(HomeContext);

  if (context === undefined) {
    throw new Error('Context was used outside of its Provider');
  }

  return context;
};
