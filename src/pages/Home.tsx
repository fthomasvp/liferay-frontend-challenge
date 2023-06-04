import React from 'react';

import { SearchBarContextProvider } from 'context/SearchBarContext';
import { Header } from 'components/Header';

import ErrorBoundary from 'components/ErrorBoundary';
import { HomeProvider } from 'context/HomeContext';
import { CardListRepos } from 'features/github';

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
