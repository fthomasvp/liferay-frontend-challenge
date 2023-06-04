import React from 'react';

import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import ClayLabel from '@clayui/label';
import { ClayButtonWithIcon } from '@clayui/button';

import { TGitHubRepo } from 'features/github';
import { formatDistanceTimeFromNow } from 'utils/formatDate';

type Props = {
  repo: TGitHubRepo;
  logo: string;
  onStar: (repo: TGitHubRepo) => void;
  onDelete: (repo: TGitHubRepo) => void;
};

const Card = ({ repo, logo, onStar, onDelete }: Props) => {
  return (
    <ClayCard>
      <ClayCard.Row style={{ height: '50px', alignItems: 'center' }}>
        <img alt="Liferay" src={logo} />

        <ClayLayout.Col size={8}>
          <ClayCard.Description displayType="title">
            {repo.full_name}
          </ClayCard.Description>
        </ClayLayout.Col>

        <ClayButtonWithIcon
          aria-label="Star"
          displayType="unstyled"
          onClick={() => onStar(repo)}
          symbol={repo.isFavorited ? 'star' : 'star-o'}
        />

        <ClayButtonWithIcon
          aria-label="Trash"
          displayType="unstyled"
          onClick={() => onDelete(repo)}
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
                <span className="font-weight-normal">{repo.forks_count}</span>
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

              <ClayCard.Description data-testid="age" displayType="title">
                Age{' '}
                <span className="font-weight-normal">{repo.created_at}</span>
              </ClayCard.Description>

              <ClayCard.Description
                data-testid="lastCommitAt"
                displayType="title"
              >
                Last commit{' '}
                <span className="font-weight-normal">
                  {repo.lastCommitAt
                    ? formatDistanceTimeFromNow(repo.lastCommitAt)
                    : 'No commits yet'}
                </span>
              </ClayCard.Description>

              <ClayCard.Description data-testid="license" displayType="title">
                License{' '}
                <span className="font-weight-normal">
                  {repo.license?.name || 'N/A'}
                </span>
              </ClayCard.Description>

              <ClayCard.Caption>
                <ClayLabel data-testid="language" displayType="danger">
                  {repo.language || 'N/A'}
                </ClayLabel>
              </ClayCard.Caption>
            </section>
          </div>
        </ClayCard.Row>
      </ClayCard.Body>
    </ClayCard>
  );
};

export default Card;
