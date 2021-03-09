import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import ClayLabel from '@clayui/label';
import ClayEmptyState from '@clayui/empty-state';
import ClayButton, { ClayButtonWithIcon } from '@clayui/button';

import ModalDelete from './modal-delete';
import { DashboardContext } from 'contexts/dashboard';
import { GitHubRepo } from 'utils/types';
import lifeRayLogo from 'images/icons/liferay_logo.svg';
import emptyImage from 'images/empty_state.gif';

type Props = {
  items: GitHubRepo[];
  isFilteredItems?: boolean;
};

const DynamicDisplay = (props: Props): JSX.Element => {
  const {
    setSelectedRepository,
    setFilteredRepositories,
    setIsFiltering,
    favorRepository,
    setStarIcon,
  } = React.useContext(DashboardContext);

  const { items, isFilteredItems } = props;

  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <ClayLayout.ContainerFluid view>
        <ClayLayout.Row>
          {items.length > 0 &&
            items.map(
              ({
                id,
                full_name,
                stargazers_count,
                forks_count,
                open_issues_count,
                created_at,
                lastCommitAt,
                license,
                language,
                isFavored,
              }) => (
                <div key={id} className="col-md-4">
                  <ClayCard>
                    <ClayCard.Row
                      style={{ height: '50px', alignItems: 'center' }}
                    >
                      <img
                        src={lifeRayLogo}
                        alt="Liferay logo"
                        style={{ marginLeft: '6px' }}
                      />

                      <ClayLayout.Col size={8}>
                        <ClayCard.Description
                          data-testid="fullName"
                          displayType="title"
                        >
                          {full_name}
                        </ClayCard.Description>
                      </ClayLayout.Col>

                      <ClayButtonWithIcon
                        aria-label="Star"
                        displayType="unstyled"
                        onClick={() => {
                          const repository = {
                            id,
                            full_name,
                            stargazers_count,
                            forks_count,
                            open_issues_count,
                            created_at,
                            lastCommitAt,
                            license,
                            language,
                            isFavored,
                          };

                          favorRepository(repository);
                        }}
                        symbol={isFavored ? 'star' : 'star-o'}
                      />

                      <ClayButtonWithIcon
                        data-testid="trashIcon"
                        aria-label="Trash"
                        displayType="unstyled"
                        onClick={() => {
                          setVisible(true);

                          const repository = {
                            id,
                            full_name,
                            stargazers_count,
                            forks_count,
                            open_issues_count,
                            created_at,
                            lastCommitAt,
                            license,
                            language,
                            isFavored,
                          };

                          setSelectedRepository(repository);
                        }}
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
                                {stargazers_count}
                              </span>
                            </ClayCard.Description>

                            <ClayCard.Description
                              data-testid="forksCount"
                              displayType="title"
                            >
                              Forks{' '}
                              <span className="font-weight-normal">
                                {forks_count}
                              </span>
                            </ClayCard.Description>

                            <ClayCard.Description
                              data-testid="openIssues"
                              displayType="title"
                            >
                              Open issues{' '}
                              <span className="font-weight-normal">
                                {open_issues_count}
                              </span>
                            </ClayCard.Description>

                            <ClayCard.Description
                              data-testid="age"
                              displayType="title"
                            >
                              Age{' '}
                              <span className="font-weight-normal">
                                {formatDistanceToNow(new Date(created_at), {
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
                                {lastCommitAt
                                  ? formatDistanceToNow(
                                      new Date(lastCommitAt),
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
                                {license?.name || 'N/A'}
                              </span>
                            </ClayCard.Description>

                            <ClayCard.Caption>
                              <ClayLabel
                                data-testid="language"
                                displayType="danger"
                              >
                                {language || 'N/A'}
                              </ClayLabel>
                            </ClayCard.Caption>
                          </section>
                        </div>
                      </ClayCard.Row>
                    </ClayCard.Body>
                  </ClayCard>
                </div>
              )
            )}
        </ClayLayout.Row>

        {isFilteredItems
          ? items.length === 0 && (
              <ClayEmptyState
                description="No results were found that matched"
                imgProps={{
                  alt: 'satellite up and down',
                  title: 'repository not found',
                }}
                imgSrc={emptyImage}
                title="Something went wrong!"
              >
                <ClayButton
                  displayType="secondary"
                  onClick={() => {
                    setFilteredRepositories([]);
                    setStarIcon(true);
                    setIsFiltering(false);
                  }}
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
                imgSrc={emptyImage}
                title="There is still nothing here"
              />
            )}
      </ClayLayout.ContainerFluid>

      <ModalDelete visible={visible} setVisible={setVisible} />
    </>
  );
};

export default DynamicDisplay;
