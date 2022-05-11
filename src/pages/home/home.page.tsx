import React from 'react';

import { HomeContextProvider } from 'contexts/home/home.context';
import { SearchBarContextProvider } from 'contexts/search-bar/search-bar.context';
import Header from 'components/header/header.component';
import CardListRepos from 'components/card-list-repos/card-list-repos.component';
import ErrorBoundary from 'components/error-boundary/error-boundary.component';

const HomePage = (): JSX.Element => {
  return (
    <HomeContextProvider>
      <SearchBarContextProvider>
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>

        <ErrorBoundary>
          <CardListRepos />
        </ErrorBoundary>
      </SearchBarContextProvider>
    </HomeContextProvider>
  );
};

export default HomePage;
