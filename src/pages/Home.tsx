import React, { useCallback, useState } from 'react';

import { SearchBarContextProvider } from 'context/search-bar/search-bar.context';
import Header from 'components/header/header.component';
import CardListRepos from 'components/card-list-repos/card-list-repos.component';
import ErrorBoundary from 'components/error-boundary/error-boundary.component';
import { HomeContext } from 'context/HomeContext';
import type { TGitHubRepo } from 'features/github';

const HomePage = () => {
  const [repositories, setRepositories] = useState<TGitHubRepo[]>([]);
  const [isStarred, setIsStarred] = useState(false);

  const setStarredFilter = useCallback((isStarred: boolean) => {
    setIsStarred(isStarred);
  }, []);

  const setRepos = useCallback((repos: TGitHubRepo[]) => {
    setRepositories(repos);
  }, []);

  return (
    <ErrorBoundary>
      <HomeContext.Provider
        value={{
          isStarred,
          setIsStarred: setStarredFilter,
          repositories,
          setRepositories: setRepos,
        }}
      >
        <SearchBarContextProvider>
          <Header />
          <CardListRepos />
        </SearchBarContextProvider>
      </HomeContext.Provider>
    </ErrorBoundary>
  );
};

export default HomePage;
