import React, { KeyboardEvent, useState } from 'react';

import ClayManagementToolbar from '@clayui/management-toolbar';
import { ClayInput } from '@clayui/form';
import { ClayButtonWithIcon } from '@clayui/button';

import { useHomeContext } from 'context/HomeContext';
import { useSearchBarContext } from 'context/SearchBarContext';
import { TGitHubRepo } from 'features/github';
import { MINIMUM_REPO_NAME_LENGTH } from 'utils/constants';

const SearchBar = () => {
  const { repositories } = useHomeContext();
  const {
    isShowMobile,
    setIsShowMobile,
    setFilteredRepos,
    setIsFiltering,
  } = useSearchBarContext();

  const [repoName, setRepoName] = useState('');

  const filterRepos = () => {
    if (repoName.trim().length === 0) {
      setIsFiltering(false);

      return;
    }

    if (
      repoName.trim().length > MINIMUM_REPO_NAME_LENGTH &&
      repositories.length > 0
    ) {
      setIsFiltering(true);

      let filteredRepos: TGitHubRepo[] = [];

      filteredRepos = repositories.filter(({ full_name }) =>
        full_name.match(new RegExp(repoName, 'i'))
      );

      setFilteredRepos(filteredRepos);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      filterRepos();
    }
  };

  return (
    <ClayManagementToolbar.Search showMobile={isShowMobile}>
      <ClayInput.Group>
        <ClayInput.GroupItem>
          <ClayInput
            aria-label="Search"
            className="input-group-inset input-group-inset-after"
            onChange={({ target }) => setRepoName(target.value)}
            onKeyDown={handleKeyDown}
            placeholder="liferay/clay"
            type="text"
            value={repoName}
          />
          <ClayInput.GroupInsetItem after tag="span">
            <ClayButtonWithIcon
              className="navbar-breakpoint-d-none"
              displayType="unstyled"
              onClick={() => setIsShowMobile(false)}
              symbol="times"
            />
            <ClayButtonWithIcon
              aria-label="Search Icon"
              displayType="unstyled"
              onClick={filterRepos}
              symbol="search"
              type="button"
            />
          </ClayInput.GroupInsetItem>
        </ClayInput.GroupItem>
      </ClayInput.Group>
    </ClayManagementToolbar.Search>
  );
};

export default SearchBar;
