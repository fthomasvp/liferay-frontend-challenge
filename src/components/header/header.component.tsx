import React, { useEffect, useState } from 'react';
import _orderBy from 'lodash.orderby';

import ClayManagementToolbar from '@clayui/management-toolbar';
import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import { ClayDropDownWithItems } from '@clayui/drop-down';
import { IItem } from '@clayui/drop-down/lib/drilldown/Menu';

import { useHomeContext } from 'context/HomeContext';
import { useSearchBarContext } from 'hooks/use-search-bar.hook';
import SearchBar from '../search-bar/search-bar.component';
import AddRepoPopover from 'components/add-repo/add-repo.component';
import { TGitHubRepo } from 'features/github';
import githubIcon from 'assets/icons/github.svg';
import './header.styles.css';

const viewTypes = [
  {
    active: true,
    disabled: true,
    label: 'Card',
    symbolLeft: 'cards2',
  },
];

const Header = (): JSX.Element => {
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

  const viewTypeActive = viewTypes.find((type) => type.active);

  const handleClickFilterFavorites = () => {
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
  }, [isStarred, repositories]);

  useEffect(() => {
    if (isFiltering && fieldToSort) {
      const repos = _orderBy(
        filteredRepos,
        [fieldToSort],
        ['desc']
      ) as TGitHubRepo[];

      setFilteredRepos(repos);
    }
  }, [isFiltering, fieldToSort]);

  return (
    <ClayManagementToolbar>
      <ClayManagementToolbar.ItemList>
        <ClayManagementToolbar.Item style={{ marginRight: '1.2rem' }}>
          <img src={githubIcon} alt="github logo" />
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

      {/* Search Bar */}
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
            onClick={handleClickFilterFavorites}
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
            items={viewTypes}
            trigger={
              <ClayButton
                className="nav-link-monospaced nav-link"
                displayType="unstyled"
              >
                <ClayIcon symbol={viewTypeActive?.symbolLeft ?? ''} />
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
