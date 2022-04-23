import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import ClayLabel from '@clayui/label';
import ClayEmptyState from '@clayui/empty-state';
import ClayButton, { ClayButtonWithIcon } from '@clayui/button';

import { useHomeContext } from 'hooks/use-home.hook';
import { useSearchBarContext } from 'hooks/use-search-bar.hook';
import DeleteRepoModal from '../delete-repo/delete-repo.component';
import liferayLogo from 'assets/icons/liferay_logo.svg';
import animatedNotFoundIllustration from 'assets/images/animated_not_found_illustration.gif';
import { GitHubRepo } from 'utils/types';

const ListRepos = (): JSX.Element => {
  const {
    repositories,
    setRepositories,
    setIsFilteringFavorites,
  } = useHomeContext();
  const {
    filteredRepos,
    setFilteredRepos,
    isFiltering,
    setIsFiltering,
  } = useSearchBarContext();

  const [isDeleteRepoVisible, setIsDeleteRepoVisible] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  const items = isFiltering ? filteredRepos : repositories;

  const favoriteRepo = ({ id }: GitHubRepo) => {
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

  const handleClickClearFilter = () => {
    setIsFiltering(false);
    setIsFilteringFavorites(false);
  };

  const handleClickOpenDeleteRepo = (repo: GitHubRepo) => {
    setIsDeleteRepoVisible(true);

    setSelectedRepo(repo);
  };

  return (
    <>
      <ClayLayout.ContainerFluid view>
        <ClayLayout.Row>
          {items.length > 0 &&
            items.map((repo) => (
              <div key={repo.id} className="col-md-4">
                <ClayCard>
                  <ClayCard.Row
                    style={{ height: '50px', alignItems: 'center' }}
                  >
                    <img src={liferayLogo} alt="Liferay logo" />

                    <ClayLayout.Col size={8}>
                      <ClayCard.Description
                        data-testid="fullName"
                        displayType="title"
                      >
                        {repo.full_name}
                      </ClayCard.Description>
                    </ClayLayout.Col>

                    <ClayButtonWithIcon
                      aria-label="Star"
                      displayType="unstyled"
                      onClick={() => favoriteRepo(repo)}
                      symbol={repo.isFavorited ? 'star' : 'star-o'}
                    />

                    <ClayButtonWithIcon
                      data-testid="trashIcon"
                      aria-label="Trash"
                      displayType="unstyled"
                      onClick={() => handleClickOpenDeleteRepo(repo)}
                      symbol="trash"
                    />
                  </ClayCard.Row>

                  <div
                    className="card-divider"
                    style={{ marginTop: '0px', marginBottom: '0px' }}
                  />

                  <ClayCard.Body>
                    <ClayCard.Row>
                      <div className="autofit-col autofit-col-expand">
                        <section className="autofit-section">
                          <ClayCard.Description
                            data-testid="stargazersCount"
                            displayType="title"
                          >
                            Stars{' '}
                            <span className="font-weight-normal">
                              {repo.stargazers_count}
                            </span>
                          </ClayCard.Description>

                          <ClayCard.Description
                            data-testid="forksCount"
                            displayType="title"
                          >
                            Forks{' '}
                            <span className="font-weight-normal">
                              {repo.forks_count}
                            </span>
                          </ClayCard.Description>

                          <ClayCard.Description
                            data-testid="openIssues"
                            displayType="title"
                          >
                            Open issues{' '}
                            <span className="font-weight-normal">
                              {repo.open_issues_count}
                            </span>
                          </ClayCard.Description>

                          <ClayCard.Description
                            data-testid="age"
                            displayType="title"
                          >
                            Age{' '}
                            <span className="font-weight-normal">
                              {formatDistanceToNow(new Date(repo.created_at), {
                                addSuffix: true,
                              })}
                            </span>
                          </ClayCard.Description>

                          <ClayCard.Description
                            data-testid="lastCommitAt"
                            displayType="title"
                          >
                            Last commit{' '}
                            <span className="font-weight-normal">
                              {repo.lastCommitAt
                                ? formatDistanceToNow(
                                    new Date(repo.lastCommitAt),
                                    {
                                      addSuffix: true,
                                    }
                                  )
                                : 'No commits yet'}
                            </span>
                          </ClayCard.Description>

                          <ClayCard.Description
                            data-testid="license"
                            displayType="title"
                          >
                            License{' '}
                            <span className="font-weight-normal">
                              {repo.license?.name || 'N/A'}
                            </span>
                          </ClayCard.Description>

                          <ClayCard.Caption>
                            <ClayLabel
                              data-testid="language"
                              displayType="danger"
                            >
                              {repo.language || 'N/A'}
                            </ClayLabel>
                          </ClayCard.Caption>
                        </section>
                      </div>
                    </ClayCard.Row>
                  </ClayCard.Body>
                </ClayCard>
              </div>
            ))}
        </ClayLayout.Row>

        {isFiltering
          ? items.length === 0 && (
              <ClayEmptyState
                description="No results were found that matched"
                imgProps={{
                  alt: 'satellite up and down',
                  title: 'repository not found',
                }}
                imgSrc={animatedNotFoundIllustration}
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
                description="Add some repositories by clicking add new repository"
                imgProps={{
                  alt: 'satellite up and down',
                  title: 'waiting for a repository',
                }}
                imgSrc={animatedNotFoundIllustration}
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

export default ListRepos;
