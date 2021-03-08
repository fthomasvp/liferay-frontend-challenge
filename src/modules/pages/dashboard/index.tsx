import React from 'react';
import _orderBy from 'lodash.orderby';

import ClayEmptyState from '@clayui/empty-state';

import Header from 'modules/components/header';
import DynamicDisplay from 'modules/components/dynamic-list-display';
import { DashboardContext } from 'contexts/dashboard';
import { GitHubRepo } from 'utils/types';
import emptyImage from 'images/empty_state.gif';

const Dashboard = (): JSX.Element => {
  const [repositories, setRepositories] = React.useState<GitHubRepo[]>([]);
  const [
    selectedRepository,
    setSelectedRepository,
  ] = React.useState<GitHubRepo>();

  const addRepository = React.useCallback(
    (repository) => {
      setRepositories([repository, ...repositories]);
    },
    [repositories]
  );

  const deleteRepository = () => {
    const newRepositories = repositories.filter(
      (repo) => repo.id !== selectedRepository?.id
    );

    setRepositories(newRepositories);
  };

  const orderRepositories = (e: any) => {
    const { name: fieldToSort } = e.target;

    setRepositories(
      _orderBy(repositories, [fieldToSort], ['desc']) as GitHubRepo[]
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        addRepository,
        deleteRepository,
        repositories,
        selectedRepository,
        setSelectedRepository,
        orderRepositories,
      }}
    >
      <Header />

      {repositories.length > 0 ? (
        <DynamicDisplay />
      ) : (
        <ClayEmptyState
          description="Add some repositories by clicking add new repository"
          imgProps={{
            alt: 'satellite up and down',
            title: 'waiting for a repository',
          }}
          imgSrc={emptyImage}
          title="There is still nothing here"
        />
      )}
    </DashboardContext.Provider>
  );
};

export default Dashboard;
