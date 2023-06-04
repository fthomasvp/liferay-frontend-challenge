import React, { useState } from 'react';

import ClayLayout from '@clayui/layout';
import ClayEmptyState from '@clayui/empty-state';
import ClayButton from '@clayui/button';

import { useHomeContext } from 'context/HomeContext';
import { useSearchBarContext } from 'context/SearchBarContext';
import { DeleteRepoModal, TGitHubRepo } from 'features/github';
import { Card } from 'components/Card';

import LiferayLogo from 'assets/icons/liferay_logo.svg';
import AnimatedSatellite from 'assets/images/animated_satellite.gif';

const CardList = () => {
  const { repositories, setRepositories, setIsStarred } = useHomeContext();
  const {
    filteredRepos,
    setFilteredRepos,
    isFiltering,
    setIsFiltering,
  } = useSearchBarContext();

  const [isDeleteRepoVisible, setIsDeleteRepoVisible] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<TGitHubRepo | null>(null);

  const items = isFiltering ? filteredRepos : repositories;

  const handleStarRepo = ({ id }: TGitHubRepo) => {
    const repos = repositories.map((repository) => {
      if (repository.id === id) {
        repository.isFavorited = !repository.isFavorited;
      }

      return repository;
    });

    setRepositories(repos);

    if (isFiltering) {
      setFilteredRepos(repos);
    }
  };

  const handleDeleteRepo = (repo: TGitHubRepo) => {
    setIsDeleteRepoVisible(true);

    setSelectedRepo(repo);
  };

  const handleClickClearFilter = () => {
    setIsFiltering(false);
    setIsStarred(false);
  };

  return (
    <>
      <ClayLayout.ContainerFluid view>
        <ClayLayout.Row>
          {items.length > 0 &&
            items.map((repo) => (
              <div key={repo.id} className="col-md-4">
                <Card
                  repo={repo}
                  logo={LiferayLogo}
                  onStar={handleStarRepo}
                  onDelete={handleDeleteRepo}
                />
              </div>
            ))}
        </ClayLayout.Row>

        {isFiltering
          ? items.length === 0 && (
              <ClayEmptyState
                description="No results were found that matched"
                imgProps={{
                  alt: 'Satellite moving up and down',
                  title: 'repository not found',
                }}
                imgSrc={AnimatedSatellite}
                title="Something went wrong!"
              >
                <ClayButton
                  displayType="secondary"
                  onClick={handleClickClearFilter}
                >
                  Clear Filter
                </ClayButton>
              </ClayEmptyState>
            )
          : items.length === 0 && (
              <ClayEmptyState
                description="Add some repositories by clicking on the blue add button"
                imgProps={{
                  alt: 'Satellite moving up and down',
                  title: 'Waiting for a repository to be added',
                }}
                imgSrc={AnimatedSatellite}
                title="There is still nothing here"
              />
            )}
      </ClayLayout.ContainerFluid>

      <DeleteRepoModal
        repo={selectedRepo}
        visible={isDeleteRepoVisible}
        setVisible={setIsDeleteRepoVisible}
      />
    </>
  );
};

export default CardList;
