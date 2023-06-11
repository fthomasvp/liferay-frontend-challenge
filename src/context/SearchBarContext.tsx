import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useCallback,
  useMemo,
  PropsWithChildren,
} from 'react';

import { TGitHubRepo } from 'features/github';

export type TSearchBarContext = {
  filteredRepos: TGitHubRepo[];
  setFilteredRepos: (repos: TGitHubRepo[]) => void;
  isFiltering: boolean;
  setIsFiltering: (isFiltering: boolean) => void;
  isShowMobile: boolean;
  setIsShowMobile: (isShowMobile: boolean) => void;
};

export const SearchBarContext = createContext<TSearchBarContext | undefined>(
  undefined
);

export const useSearchBarContext = () => {
  const context = useContext(SearchBarContext);

  if (!context) {
    throw new Error(
      'useSearchBarContext must be used within a SearchBarContext'
    );
  }

  return context;
};

export const SearchBarProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [filteredRepos, setFilteredRepos] = useState<TGitHubRepo[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isShowMobile, setIsShowMobile] = useState(false);

  const setReposFilter = useCallback((repos: TGitHubRepo[]) => {
    setFilteredRepos(repos);
  }, []);

  const setFiltering = useCallback((isFiltering: boolean) => {
    setIsFiltering(isFiltering);
  }, []);

  const setShowMobile = useCallback((isShowMobile: boolean) => {
    setIsShowMobile(isShowMobile);
  }, []);

  const contextValue = useMemo(
    () => ({
      filteredRepos,
      setFilteredRepos: setReposFilter,
      isFiltering,
      setIsFiltering: setFiltering,
      isShowMobile,
      setIsShowMobile: setShowMobile,
    }),
    [
      filteredRepos,
      setReposFilter,
      isFiltering,
      setFiltering,
      isShowMobile,
      setShowMobile,
    ]
  );

  return (
    <SearchBarContext.Provider value={contextValue}>
      {children}
    </SearchBarContext.Provider>
  );
};
