import React from 'react';

import { HomeContextProvider } from 'contexts/home/home.context';
import { SearchBarContextProvider } from 'contexts/search-bar/search-bar.context';
import Header from 'components/header/header.component';
import CardListRepos from 'components/card-list-repos/card-list-repos.component';

const HomePage = (): JSX.Element => {
  return (
    <HomeContextProvider>
      <SearchBarContextProvider>
        <Header />

        <CardListRepos />
      </SearchBarContextProvider>
    </HomeContextProvider>
  );
};

export default HomePage;
