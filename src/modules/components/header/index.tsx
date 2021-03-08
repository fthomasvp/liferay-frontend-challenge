import React from 'react';

import ClayManagementToolbar from '@clayui/management-toolbar';
import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import ClayForm, { ClayInput } from '@clayui/form';
import { ClayDropDownWithItems } from '@clayui/drop-down';
import ClayIcon from '@clayui/icon';
import ClayPopover from '@clayui/popover';

import { GitHubRepo } from 'utils/types';
import githubIcon from 'images/icons/github.svg';
import './styles.css';

type Props = {
  addRepository: (repository: GitHubRepo) => void;
  repositories: GitHubRepo[];
};

const Header = ({ addRepository, repositories }: Props): JSX.Element => {
  const filterItems = [
    { label: 'stargazers_count', onClick: () => alert('Filter clicked') },
    { label: 'forks_count', onClick: () => alert('Filter clicked') },
  ];

  const viewTypes = [
    {
      active: true,
      label: 'Card',
      onClick: () => alert('Show view card'),
      symbol: 'cards2',
    },
    {
      label: 'List',
      onClick: () => alert('Show view list'),
      symbol: 'list',
    },
    {
      label: 'Table',
      onClick: () => alert('Show view table'),
      symbol: 'table',
    },
  ];

  const [searchMobile, setSearchMobile] = React.useState(false);
  const [showPopover, setShowPopover] = React.useState(false);
  const [repositoryToSearch, setRepositoryToSearch] = React.useState('');
  const [errorFeedback, setErrorFeedback] = React.useState('');

  const viewTypeActive = viewTypes.find((type) => type.active);

  const fetchRepositoryFromGitHub = async () => {
    /**
     * RegEx to validate repository full name.
     * The user should provide an input with at least
     * one word character (or more), followed by a slash and again,
     * another word character (or more).
     */
    if (!repositoryToSearch.match(/\w{1,}\/\w{1,}/gm)) {
      setErrorFeedback('This is not a valid repository full name.');
      return;
    }

    const [username, repositoryName] = repositoryToSearch.split('/');

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
    const [username, repositoryName] = repositoryToSearch.split('/');

    const response = await fetch(
      `https://api.github.com/repos/${username}/${repositoryName}/commits`
    );

    return response.json();
  };

  const onClosePopover = () => {
    setShowPopover(false);
    setRepositoryToSearch('');
    setErrorFeedback('');
  };

  const onChangeRepositoryToSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setErrorFeedback('');

    const { value } = e.target;

    setRepositoryToSearch(value);
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

    // Get `date` from the last commit
    const [lastCommit] = await fetchRepositoryCommits();

    if (!lastCommit) {
      console.warn('The repository does not contains commit');
      repository.lastCommitAt = null;
    } else {
      const { date } = lastCommit.commit.committer;

      repository.lastCommitAt = date;
    }

    addRepository(repository);

    onClosePopover();
  };

  const onKeyPressRepositoryToSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddRepository();
    }
  };

  return (
    <ClayManagementToolbar>
      <ClayManagementToolbar.ItemList>
        <ClayManagementToolbar.Item style={{ marginRight: '28px' }}>
          <img src={githubIcon} alt="github logo" />
        </ClayManagementToolbar.Item>

        <ClayManagementToolbar.Item>
          <span className="text-capitalize text-secondary font-weight-semibold">
            Github Compare
          </span>
        </ClayManagementToolbar.Item>

        <ClayManagementToolbar.Item>
          <ClayDropDownWithItems
            items={filterItems}
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
              className="form-control input-group-inset input-group-inset-after"
              placeholder="e.g. liferay/clay"
              type="text"
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
                type="submit"
              />
            </ClayInput.GroupInsetItem>
          </ClayInput.GroupItem>
        </ClayInput.Group>
      </ClayManagementToolbar.Search>

      <ClayManagementToolbar.ItemList>
        {/* Display only on small resolution */}
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
            onClick={() => console.log('Star icon clicked')}
          >
            <ClayIcon symbol="star-o" />
          </ClayButton>
        </ClayManagementToolbar.Item>

        <ClayManagementToolbar.Item>
          <ClayButton
            className="nav-link nav-link-monospaced"
            displayType="unstyled"
            onClick={() => console.log('Adjust icon clicked')}
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
                  symbol={viewTypeActive ? viewTypeActive.symbol : ''}
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
                <p className="font-weight-semibold popover-title">
                  New repository
                </p>

                <ClayForm.Group className={errorFeedback ? 'has-error' : ''}>
                  <label
                    className="font-weight-semibold input-label"
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
                    onChange={onChangeRepositoryToSearch}
                    onKeyPress={onKeyPressRepositoryToSearch}
                    value={repositoryToSearch}
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
