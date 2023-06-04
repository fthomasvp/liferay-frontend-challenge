import React, { createContext, useCallback, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';

import { TGitHubRepo } from 'features/github';

export type THomeContext = {
  repositories: TGitHubRepo[];
  setRepositories: (repos: TGitHubRepo[]) => void;
  isStarred: boolean;
  setIsStarred: (isStarred: boolean) => void;
};

export const HomeContext = createContext<THomeContext | undefined>(undefined);

export const useHomeContext = () => {
  const home = useContext(HomeContext);

  if (!home) {
    throw new Error('useHomeContext must be used within a HomeContext');
  }

  return home;
};

export const HomeProvider = ({
  children,
}: PropsWithChildren<React.ReactNode>) => {
  const [repositories, setRepositories] = useState<TGitHubRepo[]>([]);
  const [isStarred, setIsStarred] = useState(false);

  const setStarredFilter = useCallback((isStarred: boolean) => {
    setIsStarred(isStarred);
  }, []);

  const setRepos = useCallback((repos: TGitHubRepo[]) => {
    setRepositories(repos);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      isStarred,
      setIsStarred: setStarredFilter,
      repositories,
      setRepositories: setRepos,
    }),
    [isStarred, setStarredFilter, repositories, setRepos]
  );

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};
