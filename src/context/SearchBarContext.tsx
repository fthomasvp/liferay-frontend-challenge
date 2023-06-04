import React, {
  createContext,
  Dispatch,
  SetStateAction,
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
  // TODO: update this type to use memoized function
  setFilteredRepos: (repos: TGitHubRepo[]) => void;
  isFiltering: boolean;
  setIsFiltering: Dispatch<SetStateAction<boolean>>;
  isShowMobile: boolean;
  setIsShowMobile: Dispatch<SetStateAction<boolean>>;
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

export const SearchBarContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const [filteredRepos, setFilteredRepos] = useState<TGitHubRepo[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isShowMobile, setIsShowMobile] = useState(false);

  const setReposFilter = useCallback((repos: TGitHubRepo[]) => {
    setFilteredRepos(repos);
  }, []);

  const contextValue = useMemo(
    () => ({
      filteredRepos,
      setFilteredRepos: setReposFilter,
      isFiltering,
      setIsFiltering,
      isShowMobile,
      setIsShowMobile,
    }),
    [filteredRepos, setReposFilter, isFiltering, isShowMobile]
  );

  return (
    <SearchBarContext.Provider value={contextValue}>
      {children}
    </SearchBarContext.Provider>
  );
};
