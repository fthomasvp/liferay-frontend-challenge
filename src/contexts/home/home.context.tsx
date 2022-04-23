import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import { GitHubRepo } from 'utils/types';

type HomeContextType = {
  repositories: GitHubRepo[];
  setRepositories: Dispatch<SetStateAction<GitHubRepo[]>>;
  // orderRepositories: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isFilteringFavorites: boolean;
  setIsFilteringFavorites: Dispatch<SetStateAction<boolean>>;
};

export const HomeContext = React.createContext<HomeContextType>({
  repositories: [],
  setRepositories: () => undefined,
  // orderRepositories: () => null,
  isFilteringFavorites: false,
  setIsFilteringFavorites: () => null,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [isFilteringFavorites, setIsFilteringFavorites] = useState(false);

  return (
    <HomeContext.Provider
      value={{
        repositories,
        setRepositories,
        // orderRepositories,
        isFilteringFavorites,
        setIsFilteringFavorites,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
