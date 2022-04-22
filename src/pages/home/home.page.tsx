import React from 'react';

import Header from 'components/header/header.component';
import DynamicDisplay from 'components/dynamic-display';
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

  // const filterRepositories = (filter: Filter) => {
  //   if (repositories.length > 0) {
  //     let newFilteredRepositories: GitHubRepo[] = [];

  //     if (filter?.repositoryName) {
  //       newFilteredRepositories = repositories.filter((repo) => {
  //         if (!filter.repositoryName) {
  //           return false;
  //         }

  //         return repo.full_name.match(new RegExp(filter.repositoryName, 'i'));
  //       });
  //     }

  //     if (filter?.isFavored) {
  //       newFilteredRepositories = repositories.filter(
  //         (repo) => repo.isFavored === filter.isFavored
  //       );
  //     }

  //     setFilteredRepositories(newFilteredRepositories);
  //   }
  // };

  // const favorRepository = (repository: GitHubRepo) => {
  //   if (isFiltering) {
  //     const newRepositories = filteredRepositories.map((repo) => {
  //       if (repo.id === repository?.id) {
  //         repo.isFavored = !repository.isFavored;
  //       }

  //       return repo;
  //     });

  //     setFilteredRepositories(newRepositories);
  //   }

  //   const newRepositories = repositories.map((repo) => {
  //     if (repo.id === repository?.id) {
  //       repo.isFavored = !repository.isFavored;
  //     }

  //     return repo;
  //   });

  //   setRepositories(newRepositories);
  // };

  return (
    <HomeContextProvider>
      <SearchBarContextProvider>
        <Header />

        <DynamicDisplay />
      </SearchBarContextProvider>
    </HomeContextProvider>
  );
};

export default HomePage;
