import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import { GitHubRepo } from 'utils/types';

type HomeContextType = {
  repositories: GitHubRepo[];
  setRepositories: Dispatch<SetStateAction<GitHubRepo[]>>;
  selectedRepository?: GitHubRepo;
  setSelectedRepository: Dispatch<SetStateAction<GitHubRepo | undefined>>;
  // deleteRepository: () => void;
  // orderRepositories: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isFilteringFavorites: boolean;
  setIsFilteringFavorites: Dispatch<SetStateAction<boolean>>;
};

export const HomeContext = React.createContext<HomeContextType>({
  repositories: [],
  setRepositories: () => undefined,
  selectedRepository: {
    id: 0,
    full_name: '',
    created_at: '',
    stargazers_count: 0,
    language: '',
    forks_count: 0,
    open_issues_count: 0,
    license: {
      name: '',
    },
    lastCommitAt: '',
    isFavorited: false,
  },
  setSelectedRepository: () => null,
  // deleteRepository: () => null,
  // orderRepositories: () => null,
  isFilteringFavorites: false,
  setIsFilteringFavorites: () => null,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [isFilteringFavorites, setIsFilteringFavorites] = useState(false);

  //#region TODO: Verify if is necessary
  const [selectedRepository, setSelectedRepository] = useState<GitHubRepo>();
  //#endregion

  return (
    <HomeContext.Provider
      value={{
        repositories,
        setRepositories,
        selectedRepository,
        setSelectedRepository,
        // deleteRepository,
        // orderRepositories,
        isFilteringFavorites,
        setIsFilteringFavorites,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
