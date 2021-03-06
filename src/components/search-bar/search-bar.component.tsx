import React, { KeyboardEvent, useState } from 'react';

import ClayManagementToolbar from '@clayui/management-toolbar';
import { ClayInput } from '@clayui/form';
import { ClayButtonWithIcon } from '@clayui/button';

import { useHomeContext } from 'hooks/use-home.hook';
import { useSearchBarContext } from 'hooks/use-search-bar.hook';
import { GitHubRepo } from 'services/github.service';
import { MINIMUM_REPO_NAME_LENGTH } from 'utils/constants';

const SearchBar = (): JSX.Element => {
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

      let filteredRepos: GitHubRepo[] = [];

      filteredRepos = repositories.filter(({ full_name }) =>
        full_name.match(new RegExp(repoName, 'i'))
      );

      setFilteredRepos(filteredRepos);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
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
            onKeyPress={handleKeyPress}
            placeholder="e.g. liferay/clay"
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
