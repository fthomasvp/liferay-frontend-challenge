import React from 'react';

import { Header } from 'components/Header';
import ErrorBoundary from 'components/ErrorBoundary';
import { SearchBarProvider } from 'context/SearchBarContext';
import { HomeProvider } from 'context/HomeContext';
import { CardRepoList } from 'features/github';

const HomePage = () => {
  return (
    <ErrorBoundary>
      <HomeProvider>
        <SearchBarProvider>
          <Header />
          <CardRepoList />
        </SearchBarProvider>
      </HomeProvider>
    </ErrorBoundary>
  );
};

export default HomePage;
