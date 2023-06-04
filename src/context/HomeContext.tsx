import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react';

import { TGitHubRepo } from 'features/github';

export type THomeContext = {
  repositories: TGitHubRepo[];
  setRepositories: (repos: TGitHubRepo[]) => void;
  isStarred: boolean;
  setIsStarred: (isStarred: boolean) => void;
};

export const HomeContext = createContext<THomeContext | undefined>(undefined);

export const useHomeContext = () => {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error('useHomeContext must be used within a HomeContext');
  }

  return context;
};

export const HomeProvider = ({ children }: PropsWithChildren<ReactNode>) => {
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
