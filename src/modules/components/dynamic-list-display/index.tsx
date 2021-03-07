import React from 'react';

import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import ClayLabel from '@clayui/label';
import { ClayButtonWithIcon } from '@clayui/button';

import { GitHubRepo } from 'utils/types';
import lifeRayLogo from 'images/icons/liferay_logo.svg';

type Props = {
  repositories: GitHubRepo[];
};

const DynamicDisplay = ({ repositories }: Props): JSX.Element => {
  return (
    <ClayLayout.ContainerFluid view>
      <ClayLayout.Row>
        {repositories.map((repo) => (
          <div key={repo.id} className="col-md-4">
            <ClayCard>
              <ClayCard.Row style={{ height: '50px', alignItems: 'center' }}>
                <img
                  src={lifeRayLogo}
                  alt="Liferay logo"
                  style={{ marginLeft: '6px' }}
                />

                <ClayLayout.Col size={8}>
                  <ClayCard.Description displayType="title">
                    {repo.full_name}
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
                      <ClayCard.Description displayType="title">
                        Stars{' '}
                        <span style={{ fontWeight: 400 }}>
                          {repo.stargazers_count}
                        </span>
                      </ClayCard.Description>

                      <ClayCard.Description displayType="title">
                        Forks{' '}
                        <span style={{ fontWeight: 400 }}>
                          {repo.forks_count}
                        </span>
                      </ClayCard.Description>

                      <ClayCard.Description displayType="title">
                        Open issues{' '}
                        <span style={{ fontWeight: 400 }}>
                          {repo.open_issues_count}
                        </span>
                      </ClayCard.Description>

                      <ClayCard.Description displayType="title">
                        Age{' '}
                        <span style={{ fontWeight: 400 }}>
                          {repo.created_at}
                        </span>
                      </ClayCard.Description>

                      <ClayCard.Description displayType="title">
                        Last commit{' '}
                        <span style={{ fontWeight: 400 }}>
                          {repo.lastCommitAt || 'No commits yet'}
                        </span>
                      </ClayCard.Description>

                      <ClayCard.Description displayType="title">
                        License{' '}
                        <span style={{ fontWeight: 400 }}>
                          {repo.license?.name || 'N/A'}
                        </span>
                      </ClayCard.Description>

                      <ClayCard.Caption>
                        <ClayLabel displayType="danger">
                          {repo.language}
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
    </ClayLayout.ContainerFluid>
  );
};

export default DynamicDisplay;
