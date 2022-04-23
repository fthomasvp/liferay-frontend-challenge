import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import { GitHubRepo } from 'services/github.service';

type HomeContextType = {
  repositories: GitHubRepo[];
  setRepositories: Dispatch<SetStateAction<GitHubRepo[]>>;
  isFilteringFavorites: boolean;
  setIsFilteringFavorites: Dispatch<SetStateAction<boolean>>;
};

export const HomeContext = React.createContext<HomeContextType>({
  repositories: [],
  setRepositories: () => undefined,
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
        isFilteringFavorites,
        setIsFilteringFavorites,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
