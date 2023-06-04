import React from 'react';

import { SearchBarContextProvider } from 'context/search-bar/search-bar.context';
import Header from 'components/header/header.component';
import CardListRepos from 'components/card-list-repos/card-list-repos.component';
import ErrorBoundary from 'components/error-boundary/error-boundary.component';
import { HomeProvider } from 'context/HomeContext';

const HomePage = () => {
  return (
    <ErrorBoundary>
      <HomeProvider>
        <SearchBarContextProvider>
          <Header />
          <CardListRepos />
        </SearchBarContextProvider>
      </HomeProvider>
    </ErrorBoundary>
  );
};

export default HomePage;
