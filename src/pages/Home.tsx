import React from 'react';

import { SearchBarContextProvider } from 'context/SearchBarContext';
import { Header } from 'components/Header';

import ErrorBoundary from 'components/ErrorBoundary';
import { HomeProvider } from 'context/HomeContext';
import { CardList } from 'features/github';

const HomePage = () => {
  return (
    <ErrorBoundary>
      <HomeProvider>
        <SearchBarContextProvider>
          <Header />
          <CardList />
        </SearchBarContextProvider>
      </HomeProvider>
    </ErrorBoundary>
  );
};

export default HomePage;
