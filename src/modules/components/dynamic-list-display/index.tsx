import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import ClayLabel from '@clayui/label';
import { ClayButtonWithIcon } from '@clayui/button';

import { GitHubContext } from 'contexts/github';
import lifeRayLogo from 'images/icons/liferay_logo.svg';

const DynamicDisplay = (): JSX.Element => {
  const { repositories } = React.useContext(GitHubContext);

  return (
    <ClayLayout.ContainerFluid view>
      <ClayLayout.Row>
        {repositories.map(
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
          }) => (
            <div key={id} className="col-md-4">
              <ClayCard>
                <ClayCard.Row style={{ height: '50px', alignItems: 'center' }}>
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
                    symbol="star-o"
                  />

                  <ClayButtonWithIcon
                    aria-label="Trash"
                    displayType="unstyled"
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
                          <span style={{ fontWeight: 400 }}>
                            {stargazers_count}
                          </span>
                        </ClayCard.Description>

                        <ClayCard.Description
                          data-testid="forksCount"
                          displayType="title"
                        >
                          Forks{' '}
                          <span style={{ fontWeight: 400 }}>{forks_count}</span>
                        </ClayCard.Description>

                        <ClayCard.Description
                          data-testid="openIssues"
                          displayType="title"
                        >
                          Open issues{' '}
                          <span style={{ fontWeight: 400 }}>
                            {open_issues_count}
                          </span>
                        </ClayCard.Description>

                        <ClayCard.Description
                          data-testid="age"
                          displayType="title"
                        >
                          Age{' '}
                          <span style={{ fontWeight: 400 }}>
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
                          <span style={{ fontWeight: 400 }}>
                            {lastCommitAt
                              ? formatDistanceToNow(new Date(lastCommitAt), {
                                  addSuffix: true,
                                })
                              : 'No commits yet'}
                          </span>
                        </ClayCard.Description>

                        <ClayCard.Description
                          data-testid="license"
                          displayType="title"
                        >
                          License{' '}
                          <span style={{ fontWeight: 400 }}>
                            {license?.name || 'N/A'}
                          </span>
                        </ClayCard.Description>

                        <ClayCard.Caption>
                          <ClayLabel
                            data-testid="language"
                            displayType="danger"
                          >
                            {language}
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
    </ClayLayout.ContainerFluid>
  );
};

export default DynamicDisplay;
