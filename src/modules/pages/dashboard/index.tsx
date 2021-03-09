import React from 'react';
import _orderBy from 'lodash.orderby';

import Header from 'modules/components/header';
import DynamicDisplay from 'modules/components/dynamic-display';
import { DashboardContext } from 'contexts/dashboard';
import { Filter, GitHubRepo } from 'utils/types';

const Dashboard = (): JSX.Element => {
  const [repositories, setRepositories] = React.useState<GitHubRepo[]>([]);
  const [
    selectedRepository,
    setSelectedRepository,
  ] = React.useState<GitHubRepo>();
  const [filteredRepositories, setFilteredRepositories] = React.useState<
    GitHubRepo[]
  >([]);
  const [searchText, setSearchText] = React.useState('');
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [starIcon, setStarIcon] = React.useState(true);

  const addRepository = React.useCallback(
    (repository) => {
      const newRepositories = [repository, ...repositories];

      setRepositories(newRepositories);
    },
    [repositories]
  );

  const deleteRepository = () => {
    if (isFiltering) {
      const newRepositories = filteredRepositories.filter(
        (repo) => repo.id !== selectedRepository?.id
      );

      setFilteredRepositories(newRepositories);
    }

    const newRepositories = repositories.filter(
      (repo) => repo.id !== selectedRepository?.id
    );

    setRepositories(newRepositories);
  };

  const orderRepositories = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const fieldToSort = (e.target as HTMLButtonElement).name;

    if (isFiltering) {
      setFilteredRepositories(
        _orderBy(filteredRepositories, [fieldToSort], ['desc']) as GitHubRepo[]
      );
    }

    setRepositories(
      _orderBy(repositories, [fieldToSort], ['desc']) as GitHubRepo[]
    );
  };

  const filterRepositories = (filter: Filter) => {
    if (repositories.length > 0) {
      let newFilteredRepositories: GitHubRepo[] = [];

      if (filter?.repositoryName) {
        newFilteredRepositories = repositories.filter((repo) => {
          if (!filter.repositoryName) {
            return false;
          }

          return repo.full_name.match(new RegExp(filter.repositoryName, 'i'));
        });
      }

      if (filter?.isFavored) {
        newFilteredRepositories = repositories.filter(
          (repo) => repo.isFavored === filter.isFavored
        );
      }

      setFilteredRepositories(newFilteredRepositories);
    }
  };

  const favorRepository = (repository: GitHubRepo) => {
    if (isFiltering) {
      const newRepositories = filteredRepositories.map((repo) => {
        if (repo.id === repository?.id) {
          repo.isFavored = !repository.isFavored;
        }

        return repo;
      });

      setFilteredRepositories(newRepositories);
    }

    const newRepositories = repositories.map((repo) => {
      if (repo.id === repository?.id) {
        repo.isFavored = !repository.isFavored;
      }

      return repo;
    });

    setRepositories(newRepositories);
  };

  return (
    <DashboardContext.Provider
      value={{
        repositories,
        filteredRepositories,
        setFilteredRepositories,
        selectedRepository,
        setSelectedRepository,
        addRepository,
        deleteRepository,
        filterRepositories,
        orderRepositories,
        searchText,
        setSearchText,
        isFiltering,
        setIsFiltering,
        favorRepository,
        starIcon,
        setStarIcon,
      }}
    >
      <Header />

      <DynamicDisplay
        isFilteredItems={isFiltering}
        items={isFiltering ? filteredRepositories : repositories}
      />
    </DashboardContext.Provider>
  );
};

export default Dashboard;
