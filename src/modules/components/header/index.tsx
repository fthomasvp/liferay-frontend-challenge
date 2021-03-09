import React from 'react';

import ClayManagementToolbar from '@clayui/management-toolbar';
import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import ClayForm, { ClayInput } from '@clayui/form';
import { ClayDropDownWithItems } from '@clayui/drop-down';
import ClayIcon from '@clayui/icon';
import ClayPopover from '@clayui/popover';

import { DashboardContext } from 'contexts/dashboard';
import { GitHubRepo } from 'utils/types';
import githubIcon from 'images/icons/github.svg';
import './styles.css';

const Header = (): JSX.Element => {
  const {
    repositories,
    addRepository,
    filterRepositories,
    orderRepositories,
    isFiltering,
    setIsFiltering,
    starIcon,
    setStarIcon,
  } = React.useContext(DashboardContext);

  const viewTypes = [
    {
      active: true,
      disabled: true,
      label: 'Card',
      symbolLeft: 'cards2',
    },
  ];

  const [searchMobile, setSearchMobile] = React.useState(false);
  const [showPopover, setShowPopover] = React.useState(false);
  const [repositoryToFetch, setRepositoryToFetch] = React.useState('');
  const [errorFeedback, setErrorFeedback] = React.useState('');
  const [searchText, setSearchText] = React.useState('');

  const viewTypeActive = viewTypes.find((type) => type.active);

  const fetchRepositoryFromGitHub = async () => {
    /**
     * RegEx to validate repository full name.
     * The user should provide an input with at least
     * one word character (or more), followed by a slash and again,
     * another word character (or more).
     */
    if (!repositoryToFetch.match(/\w{1,}\/\w{1,}/gm)) {
      setErrorFeedback('This is not a valid repository full name.');
      return;
    }

    const [username, repositoryName] = repositoryToFetch.split('/');

    const response = await fetch(
      `https://api.github.com/repos/${username}/${repositoryName}`
    );

    if (!response.ok) {
      setErrorFeedback('The repository is private or does not exist.');
      return;
    }

    return response.json();
  };

  const fetchRepositoryCommits = async () => {
    const [username, repositoryName] = repositoryToFetch.split('/');

    const response = await fetch(
      `https://api.github.com/repos/${username}/${repositoryName}/commits`
    );

    return response.json();
  };

  const onClosePopover = () => {
    setShowPopover(false);
    setRepositoryToFetch('');
    setErrorFeedback('');
  };

  const onChangeRepositoryToFetch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setErrorFeedback('');

    const { value } = e.target;

    setRepositoryToFetch(value);
  };

  const onAddRepository = async () => {
    const repository = await fetchRepositoryFromGitHub();

    /**
     * If for some reason the repository is null or undefined,
     * the onAddRepository function is going to stop right below.
     */
    if (!repository) {
      return;
    }

    const isDuplicatedRepository = repositories.find(
      (repo: GitHubRepo) => repo.id === repository.id
    );

    if (isDuplicatedRepository) {
      setErrorFeedback('This repository is already included.');
      return;
    }

    // Get `date` from the last commit in committer object
    const [lastCommit] = await fetchRepositoryCommits();

    if (!lastCommit) {
      alert('The repository does not contains commits');
      repository.lastCommitAt = null;
    } else {
      const { date } = lastCommit.commit.committer;

      repository.lastCommitAt = date;
    }

    // Add `isFavored` property (default is false)
    repository.isFavored = false;

    addRepository(repository);

    onClosePopover();
  };

  const onKeyPressRepositoryToFetch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddRepository();
    }
  };

  // After display the Popover, move focus to text input.
  React.useEffect(() => {
    if (showPopover) {
      const repositoryInput = document.getElementById('repository');

      if (repositoryInput) {
        repositoryInput.focus();
      }
    }
  }, [showPopover]);

  // Clear search text on toolbar after remove filters
  React.useEffect(() => {
    if (!isFiltering) {
      setSearchText('');
    }
  }, [isFiltering]);

  return (
    <ClayManagementToolbar>
      <ClayManagementToolbar.ItemList>
        <ClayManagementToolbar.Item style={{ marginRight: '28px' }}>
          <img src={githubIcon} alt="github logo" />
        </ClayManagementToolbar.Item>

        <ClayManagementToolbar.Item>
          <span className="text-capitalize text-secondary font-weight-semi-bold">
            Github Compare
          </span>
        </ClayManagementToolbar.Item>

        <ClayManagementToolbar.Item>
          <ClayDropDownWithItems
            items={[
              {
                label: 'ORDER BY',
                type: 'group',
                items: [
                  {
                    label: 'Stars',
                    name: 'stargazers_count',
                    onClick: orderRepositories,
                  },
                  {
                    label: 'Forks',
                    name: 'forks_count',
                    onClick: orderRepositories,
                  },
                  {
                    label: 'Open issues',
                    name: 'open_issues_count',
                    onClick: orderRepositories,
                  },
                  {
                    label: 'Age',
                    name: 'created_at',
                    onClick: orderRepositories,
                  },
                  {
                    label: 'Last commit',
                    name: 'lastCommitAt',
                    onClick: orderRepositories,
                  },
                ],
              },
            ]}
            trigger={
              <ClayButton className="nav-link" displayType="unstyled">
                <span className="navbar-breakpoint-down-d-none">
                  <span className="navbar-text-truncate">Filter and order</span>

                  <ClayIcon
                    className="inline-item inline-item-after"
                    symbol="caret-bottom"
                  />
                </span>
                <span className="navbar-breakpoint-d-none">
                  <ClayIcon symbol="filter" />
                </span>
              </ClayButton>
            }
          />
        </ClayManagementToolbar.Item>
      </ClayManagementToolbar.ItemList>

      <ClayManagementToolbar.Search showMobile={searchMobile}>
        <ClayInput.Group>
          <ClayInput.GroupItem>
            <ClayInput
              aria-label="Search"
              className="input-group-inset input-group-inset-after"
              placeholder="e.g. liferay/clay"
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();

                  setIsFiltering(true);
                  filterRepositories({
                    repositoryName: searchText,
                  });
                }
              }}
              type="text"
              value={searchText}
            />
            <ClayInput.GroupInsetItem after tag="span">
              <ClayButtonWithIcon
                className="navbar-breakpoint-d-none"
                displayType="unstyled"
                onClick={() => setSearchMobile(false)}
                symbol="times"
              />
              <ClayButtonWithIcon
                displayType="unstyled"
                symbol="search"
                onClick={() => {
                  setIsFiltering(true);
                  filterRepositories({
                    repositoryName: searchText,
                  });
                }}
                type="button"
              />
            </ClayInput.GroupInsetItem>
          </ClayInput.GroupItem>
        </ClayInput.Group>
      </ClayManagementToolbar.Search>

      <ClayManagementToolbar.ItemList>
        {/* For small resolution */}
        <ClayManagementToolbar.Item className="navbar-breakpoint-d-none">
          <ClayButton
            className="nav-link nav-link-monospaced"
            displayType="unstyled"
            onClick={() => setSearchMobile(true)}
          >
            <ClayIcon symbol="search" />
          </ClayButton>
        </ClayManagementToolbar.Item>

        <ClayManagementToolbar.Item>
          <ClayButton
            className="nav-link nav-link-monospaced"
            displayType="unstyled"
            onClick={() => {
              setIsFiltering(true);
              filterRepositories({
                isFavored: starIcon,
              });

              setStarIcon((prevState) => !prevState);
            }}
          >
            <ClayIcon symbol={starIcon ? 'star-o' : 'star'} />
          </ClayButton>
        </ClayManagementToolbar.Item>

        <ClayManagementToolbar.Item>
          <ClayButton
            className="nav-link nav-link-monospaced"
            displayType="unstyled"
            onClick={() => null}
          >
            <ClayIcon symbol="adjust" />
          </ClayButton>
        </ClayManagementToolbar.Item>

        <ClayManagementToolbar.Item>
          <ClayDropDownWithItems
            items={viewTypes}
            trigger={
              <ClayButton
                className="nav-link-monospaced nav-link"
                displayType="unstyled"
              >
                <ClayIcon
                  symbol={viewTypeActive ? viewTypeActive.symbolLeft : ''}
                />
              </ClayButton>
            }
          />
        </ClayManagementToolbar.Item>

        <ClayManagementToolbar.Item style={{ marginLeft: '24px' }}>
          <ClayPopover
            data-testid="popover"
            disableScroll
            header={
              <>
                <p className="font-weight-semi-bold popover-title">
                  New repository
                </p>

                <ClayForm.Group className={errorFeedback ? 'has-error' : ''}>
                  <label
                    className="font-weight-semi-bold input-label"
                    htmlFor="repository"
                  >
                    Repository
                    <span
                      className="reference-mark"
                      style={{ marginLeft: '4px' }}
                    >
                      <ClayIcon symbol="asterisk" />
                    </span>
                  </label>
                  <ClayInput
                    data-testid="repositoryTextInput"
                    id="repository"
                    onChange={onChangeRepositoryToFetch}
                    onKeyPress={onKeyPressRepositoryToFetch}
                    value={repositoryToFetch}
                    placeholder="e.g. liferay/clay"
                    type="text"
                  />
                  {errorFeedback && (
                    <ClayForm.FeedbackItem>
                      <ClayForm.FeedbackIndicator symbol="exclamation-full" />
                      {errorFeedback}
                    </ClayForm.FeedbackItem>
                  )}
                </ClayForm.Group>
              </>
            }
            onShowChange={setShowPopover}
            alignPosition="bottom-right"
            show={showPopover}
            trigger={
              <ClayButtonWithIcon
                data-testid="addButtonToolbarManagement"
                aria-label="Add button"
                symbol="plus"
              />
            }
          >
            <ClayButton.Group
              data-testid="popoverButtonActions"
              className="d-flex justify-content-end"
              spaced
            >
              <ClayButton displayType="secondary" onClick={onClosePopover}>
                Cancel
              </ClayButton>
              <ClayButton
                disabled={!!errorFeedback}
                displayType="primary"
                onClick={onAddRepository}
              >
                Add
              </ClayButton>
            </ClayButton.Group>
          </ClayPopover>
        </ClayManagementToolbar.Item>
      </ClayManagementToolbar.ItemList>
    </ClayManagementToolbar>
  );
};

export default Header;
