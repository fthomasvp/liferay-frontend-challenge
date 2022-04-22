import React, { useContext } from 'react';

import ClayManagementToolbar from '@clayui/management-toolbar';
import ClayButton from '@clayui/button';
import { ClayDropDownWithItems } from '@clayui/drop-down';
import ClayIcon from '@clayui/icon';

import { HomeContext } from 'contexts/home/home.context';
import SearchBar from '../search-bar/search-bar.component';
import AddRepoPopover from 'components/add-repo/add-repo.component';
import githubIcon from 'assets/icons/github.svg';
import './styles.css';

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
    // orderRepositories,
    starIcon,
    setStarIcon,
  } = useContext(HomeContext);

  const viewTypeActive = viewTypes.find((type) => type.active);

  // // Clear search text on toolbar after remove filters
  // React.useEffect(() => {
  //   if (!isFiltering) {
  //     setSearchText('');
  //   }
  // }, [isFiltering]);

  return (
    <ClayManagementToolbar data-testid="managementToolbar">
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
            items={[
              {
                label: 'ORDER BY',
                type: 'group',
                items: [
                  {
                    label: 'Stars',
                    name: 'stargazers_count',
                    // onClick: orderRepositories,
                  },
                  {
                    label: 'Forks',
                    name: 'forks_count',
                    // onClick: orderRepositories,
                  },
                  {
                    label: 'Open issues',
                    name: 'open_issues_count',
                    // onClick: orderRepositories,
                  },
                  {
                    label: 'Age',
                    name: 'created_at',
                    // onClick: orderRepositories,
                  },
                  {
                    label: 'Last commit',
                    name: 'lastCommitAt',
                    // onClick: orderRepositories,
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
            className="nav-link nav-link-monospaced"
            displayType="unstyled"
            onClick={() => {
              // setIsFiltering(true);
              // filterRepositories({
              //   isFavored: starIcon,
              // });

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

        <ClayManagementToolbar.Item style={{ marginLeft: '1rem' }}>
          <AddRepoPopover />
        </ClayManagementToolbar.Item>
      </ClayManagementToolbar.ItemList>
    </ClayManagementToolbar>
  );
};

export default Header;
