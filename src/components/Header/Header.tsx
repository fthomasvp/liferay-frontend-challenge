import React, { useEffect, useState } from 'react';
import _orderBy from 'lodash.orderby';

import ClayManagementToolbar from '@clayui/management-toolbar';
import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import { ClayDropDownWithItems } from '@clayui/drop-down';
import { IItem } from '@clayui/drop-down/lib/drilldown/Menu';

import { useHomeContext } from 'context/HomeContext';
import { useSearchBarContext } from 'context/SearchBarContext';
import { AddRepoPopover, TGitHubRepo } from 'features/github';
import { SearchBar } from '../SearchBar';
import { LIST_VIEW_OPTIONS } from 'utils/constants';
import GitHubIcon from 'assets/icons/github.svg';
import './styles.css';

const [currentView] = LIST_VIEW_OPTIONS;

const Header = () => {
  const {
    repositories,
    setRepositories,
    isStarred,
    setIsStarred,
  } = useHomeContext();
  const {
    isFiltering,
    setIsFiltering,
    filteredRepos,
    setFilteredRepos,
  } = useSearchBarContext();

  const [fieldToSort, setFieldToSort] = useState('');

  const handleFilterFavorites = () => {
    setIsFiltering(true);
    setIsStarred(!isStarred);
  };

  const sortReposBy = (field: string) => {
    setIsFiltering(true);

    const repos = _orderBy(repositories, [field], ['desc']) as TGitHubRepo[];

    setRepositories(repos);
    setFieldToSort(field);
  };

  const sortOptions: IItem[] = [
    {
      title: '',
      label: 'ORDER BY',
      type: 'group',
      items: [
        {
          label: 'Stars',
          name: 'stargazers_count',
          onClick: () => sortReposBy('stargazers_count'),
        },
        {
          label: 'Forks',
          name: 'forks_count',
          onClick: () => sortReposBy('forks_count'),
        },
        {
          label: 'Open issues',
          name: 'open_issues_count',
          onClick: () => sortReposBy('open_issues_count'),
        },
        {
          label: 'Age',
          name: 'created_at',
          onClick: () => sortReposBy('created_at'),
        },
        {
          label: 'Last commit',
          name: 'lastCommitAt',
          onClick: () => sortReposBy('lastCommitAt'),
        },
      ],
    },
  ];

  useEffect(() => {
    let repos = repositories;

    if (isStarred) {
      repos = repositories.filter(({ isFavorited }) => isFavorited);
    }

    setFilteredRepos(repos);
  }, [isStarred, repositories, setFilteredRepos]);

  useEffect(() => {
    if (isFiltering && fieldToSort) {
      const repos = _orderBy(
        filteredRepos,
        [fieldToSort],
        ['desc']
      ) as TGitHubRepo[];

      setFilteredRepos(repos);
    }
  }, [isFiltering, fieldToSort, filteredRepos, setFilteredRepos]);

  return (
    <ClayManagementToolbar>
      <ClayManagementToolbar.ItemList>
        <ClayManagementToolbar.Item style={{ marginRight: '1.2rem' }}>
          <img src={GitHubIcon} alt="github" />
        </ClayManagementToolbar.Item>

        <ClayManagementToolbar.Item>
          <span className="text-capitalize text-secondary font-weight-semi-bold">
            Github Compare
          </span>
        </ClayManagementToolbar.Item>

        <ClayManagementToolbar.Item>
          <ClayDropDownWithItems
            items={sortOptions}
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

      <SearchBar />

      <ClayManagementToolbar.ItemList>
        {/* For small resolution */}
        <ClayManagementToolbar.Item className="navbar-breakpoint-d-none">
          <ClayButton
            className="nav-link nav-link-monospaced"
            displayType="unstyled"
            // onClick={() => setSearchMobile(true)}
          >
            <ClayIcon symbol="search" />
          </ClayButton>
        </ClayManagementToolbar.Item>

        <ClayManagementToolbar.Item>
          <ClayButton
            aria-label="Star filter button"
            className="nav-link nav-link-monospaced"
            disabled={repositories.length === 0}
            displayType="unstyled"
            onClick={handleFilterFavorites}
          >
            <ClayIcon symbol={isStarred ? 'star' : 'star-o'} />
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
            items={LIST_VIEW_OPTIONS}
            trigger={
              <ClayButton
                className="nav-link-monospaced nav-link"
                displayType="unstyled"
              >
                <ClayIcon symbol={currentView.symbolLeft} />
              </ClayButton>
            }
          />
        </ClayManagementToolbar.Item>

        <ClayManagementToolbar.Item style={{ marginLeft: '1rem' }}>
          <AddRepoPopover />
        </ClayManagementToolbar.Item>
      </ClayManagementToolbar.ItemList>
    </ClayManagementToolbar>
  );
};

export default Header;
