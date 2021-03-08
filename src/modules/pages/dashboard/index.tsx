import React from 'react';
import _orderBy from 'lodash.orderby';

import Header from 'modules/components/header';
import DynamicDisplay from 'modules/components/dynamic-list-display';
import { DashboardContext } from 'contexts/dashboard';
import { GitHubRepo } from 'utils/types';

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

  const addRepository = React.useCallback(
    (repository) => {
      const newRepositories = [repository, ...repositories];

      setRepositories(newRepositories);
    },
    [repositories]
  );

  const deleteRepository = () => {
    const newRepositories = repositories.filter(
      (repo) => repo.id !== selectedRepository?.id
    );

    setRepositories(newRepositories);
  };

  const orderRepositories = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const fieldToSort = (e.target as HTMLButtonElement).name;

    setRepositories(
      _orderBy(repositories, [fieldToSort], ['desc']) as GitHubRepo[]
    );
  };

  const filterRepositories = (text: string) => {
    if (repositories.length > 0) {
      const newFilteredRepositories = repositories.filter((repo) => {
        if (!text) {
          return false;
        }

        return repo.full_name.includes(text);
      });

      setFilteredRepositories(newFilteredRepositories);
    }
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
