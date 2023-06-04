import React, {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
} from 'react';

import { TGitHubRepo } from 'features/github';

export type SearchBarContextType = {
  filteredRepos: TGitHubRepo[];
  setFilteredRepos: Dispatch<SetStateAction<TGitHubRepo[]>>;
  isFiltering: boolean;
  setIsFiltering: Dispatch<SetStateAction<boolean>>;
  isShowMobile: boolean;
  setIsShowMobile: Dispatch<SetStateAction<boolean>>;
};

const initialValues = {
  filteredRepos: [],
  setFilteredRepos: () => undefined,
  isFiltering: false,
  setIsFiltering: () => undefined,
  isShowMobile: false,
  setIsShowMobile: () => undefined,
};

export const SearchBarContext = createContext<SearchBarContextType>(
  initialValues
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SearchBarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [filteredRepos, setFilteredRepos] = useState<TGitHubRepo[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [isShowMobile, setIsShowMobile] = useState<boolean>(false);

  return (
    <SearchBarContext.Provider
      value={{
        ...initialValues,
        filteredRepos,
        setFilteredRepos,
        isFiltering,
        setIsFiltering,
        isShowMobile,
        setIsShowMobile,
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};
