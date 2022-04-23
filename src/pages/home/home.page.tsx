import React from 'react';

import Header from 'components/header/header.component';
import ListRepos from 'components/list-repos/list-repos.component';
import { HomeContextProvider } from 'contexts/home/home.context';
import { SearchBarContextProvider } from 'contexts/search-bar/search-bar.context';

const HomePage = (): JSX.Element => {
  // const deleteRepository = () => {
  //   if (isFiltering) {
  //     const newRepositories = filteredRepositories.filter(
  //       (repo) => repo.id !== selectedRepository?.id
  //     );

  //     setFilteredRepositories(newRepositories);
  //   }

  //   const newRepositories = repositories.filter(
  //     (repo) => repo.id !== selectedRepository?.id
  //   );

  //   setRepositories(newRepositories);
  // };

  // const orderRepositories = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  //   const fieldToSort = (e.target as HTMLButtonElement).name;

  //   if (isFiltering) {
  //     setFilteredRepositories(
  //       _orderBy(filteredRepositories, [fieldToSort], ['desc']) as GitHubRepo[]
  //     );
  //   }

  //   setRepositories(
  //     _orderBy(repositories, [fieldToSort], ['desc']) as GitHubRepo[]
  //   );
  // };

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
