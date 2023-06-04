import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';

import ClayButton from '@clayui/button';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayPopover from '@clayui/popover';
import { ClayButtonWithIcon } from '@clayui/button';

import { getRepository, getRepositoryCommits } from 'features/github/services';
import { useHomeContext } from 'context/HomeContext';

const AddRepoPopover = () => {
  const { repositories, setRepositories } = useHomeContext();

  const [error, setError] = useState('');
  const [repoName, setRepoName] = useState('');
  const [isShowPopover, setIsShowPopover] = useState(false);

  const repoNameRef = useRef<HTMLInputElement | null>(null);

  const handleAddRepo = async () => {
    /**
     * RegEx to validate repository full name.
     * The user must provide an input with at least
     * one word, followed by a slash and another word.
     */
    if (!repoName.match(/\w{1,}\/\w{1,}/gm)) {
      setError('This is not a valid repository full name.');

      return;
    }

    const [username, repositoryName] = repoName.split('/');

    const repository = await getRepository({ username, repositoryName });

    if (!repository) {
      setError('The repository is private or does not exist.');

      return;
    }

    const isDuplicatedRepo = repositories.find(
      ({ id }) => id === repository.id
    );

    if (isDuplicatedRepo) {
      setError('This repository is already included in your list.');

      return;
    }

    const commits = await getRepositoryCommits({
      repositoryName,
      username,
    });

    const [lastCommit] = commits;

    if (!lastCommit) {
      alert('The repository does not contains commits');
      repository.lastCommitAt = null;
    } else {
      const { date } = lastCommit.commit.committer;
      repository.lastCommitAt = date;
    }

    // Add `isFavorited` property (default is false)
    repository.isFavorited = false;

    setRepositories([repository, ...repositories]);

    onClosePopover();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      handleAddRepo();
    }
  };

  const handleChangeRepoName = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setRepoName(target.value);
  };

  const onClosePopover = () => {
    setIsShowPopover(false);
    setRepoName('');
    setError('');
  };

  useEffect(() => {
    if (isShowPopover && repoNameRef.current) {
      repoNameRef.current.focus();
    }
  }, [isShowPopover]);

  return (
    <ClayPopover
      disableScroll
      alignPosition="bottom-right"
      header={
        <>
          <p className="font-weight-semi-bold popover-title">New repository</p>

          <ClayForm.Group className={error ? 'has-error' : ''}>
            <label
              className="font-weight-semi-bold input-label"
              htmlFor="repository"
            >
              Repository
              <span className="reference-mark" style={{ marginLeft: '4px' }}>
                <ClayIcon symbol="asterisk" />
              </span>
            </label>
            <ClayInput
              id="repository"
              onChange={handleChangeRepoName}
              onKeyPress={handleKeyPress}
              placeholder="e.g. liferay/clay"
              ref={repoNameRef}
              type="text"
              value={repoName}
            />
            {error && (
              <ClayForm.FeedbackItem>
                <ClayForm.FeedbackIndicator symbol="exclamation-full" />
                {error}
              </ClayForm.FeedbackItem>
            )}
          </ClayForm.Group>
        </>
      }
      onShowChange={setIsShowPopover}
      show={isShowPopover}
      trigger={<ClayButtonWithIcon aria-label="Add button" symbol="plus" />}
    >
      <ClayButton.Group className="d-flex justify-content-end" spaced>
        <ClayButton displayType="secondary" onClick={onClosePopover}>
          Cancel
        </ClayButton>
        <ClayButton
          disabled={Boolean(error)}
          displayType="primary"
          onClick={handleAddRepo}
        >
          Add
        </ClayButton>
      </ClayButton.Group>
    </ClayPopover>
  );
};

export default AddRepoPopover;
