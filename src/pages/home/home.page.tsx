import React from 'react';

import { HomeContextProvider } from 'contexts/home/home.context';
import { SearchBarContextProvider } from 'contexts/search-bar/search-bar.context';
import Header from 'components/header/header.component';
import ListRepos from 'components/list-repos/list-repos.component';

const HomePage = (): JSX.Element => {
  return (
    <HomeContextProvider>
      <SearchBarContextProvider>
        <Header />

        <ListRepos />
      </SearchBarContextProvider>
    </HomeContextProvider>
  );
};

export default HomePage;
