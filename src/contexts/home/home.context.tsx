import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import { GitHubRepo } from 'utils/types';

type HomeContextType = {
  repositories: GitHubRepo[];
  setRepositories: Dispatch<SetStateAction<GitHubRepo[]>>;
  selectedRepository?: GitHubRepo;
  setSelectedRepository: Dispatch<SetStateAction<GitHubRepo | undefined>>;
  // deleteRepository: () => void;
  // favorRepository: (repository: GitHubRepo) => void;
  // orderRepositories: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  starIcon: boolean;
  setStarIcon: Dispatch<SetStateAction<boolean>>;
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
    isFavored: false,
  },
  setSelectedRepository: () => null,
  // deleteRepository: () => null,
  // orderRepositories: () => null,
  // favorRepository: () => null,
  starIcon: true,
  setStarIcon: () => null,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);

  //#region TODO: Verify if is necessary
  const [selectedRepository, setSelectedRepository] = useState<GitHubRepo>();
  const [starIcon, setStarIcon] = useState(true);
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
        // favorRepository,
        starIcon,
        setStarIcon,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
