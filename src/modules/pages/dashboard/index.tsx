import React from 'react';

import ClayEmptyState from '@clayui/empty-state';

import Header from 'modules/components/header';
import DynamicDisplay from 'modules/components/dynamic-list-display';
import { GitHubRepo } from 'utils/types';
import emptyImage from 'images/empty_state.gif';

const Dashboard = (): JSX.Element => {
  const [repositories, setRepositories] = React.useState<GitHubRepo[]>([]);

  const addRepository = React.useCallback(
    (repository) => {
      setRepositories([repository, ...repositories]);
    },
    [repositories]
  );

  return (
    <>
      <Header addRepository={addRepository} repositories={repositories} />

      {repositories.length > 0 ? (
        <DynamicDisplay repositories={repositories} />
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
    </>
  );
};

export default Dashboard;
