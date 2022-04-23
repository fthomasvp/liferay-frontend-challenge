import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';

import ClayButton from '@clayui/button';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayPopover from '@clayui/popover';
import { ClayButtonWithIcon } from '@clayui/button';

import { getRepository, getRepositoryCommits } from 'services/github.service';
import { useHomeContext } from 'hooks/use-home.hook';

const AddRepoPopover = (): JSX.Element => {
  const { repositories, setRepositories } = useHomeContext();

  const [feedbackError, setFeedbackError] = useState('');
  const [repoName, setRepoName] = useState('');
  const [isShowPopover, setIsShowPopover] = useState(false);

  const repoNameRef = useRef<HTMLInputElement | null>(null);

  const handleClickAddRepo = async () => {
    /**
     * RegEx to validate repository full name.
     * The user should provide an input with at least
     * one word, followed by a slash and another word.
     */
    if (!repoName.match(/\w{1,}\/\w{1,}/gm)) {
      setFeedbackError('This is not a valid repository full name.');

      return;
    }

    const [username, repositoryName] = repoName.split('/');

    let response = await getRepository({ username, repositoryName });

    if (!response.ok) {
      setFeedbackError('The repository is private or does not exist.');

      return;
    }

    const repository = await response.json();

    if (!repository) {
      return;
    }

    const isDuplicatedRepo = repositories.find(
      ({ id }) => id === repository.id
    );

    if (isDuplicatedRepo) {
      setFeedbackError('This repository is already included.');

      return;
    }

    response = await getRepositoryCommits({
      repositoryName,
      username,
    });

    const [lastCommit] = await response.json();

    if (!lastCommit) {
      alert('The repository does not contains commits');
      repository.lastCommitAt = null;
    } else {
      const { date } = lastCommit.commit.committer;

      repository.lastCommitAt = date;
    }

    // Add `isFavorited` property (default is false)
    repository.isFavorited = false;

    setRepositories((prevRepos) => [repository, ...prevRepos]);

    onClosePopover();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      handleClickAddRepo();
    }
  };

  const handleChangeRepoName = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackError('');
    setRepoName(target.value);
  };

  const onClosePopover = () => {
    setIsShowPopover(false);
    setRepoName('');
    setFeedbackError('');
  };

  useEffect(() => {
    if (isShowPopover) {
      if (repoNameRef.current) {
        repoNameRef.current.focus();
      }
    }
  }, [isShowPopover]);

  return (
    <ClayPopover
      disableScroll
      alignPosition="bottom-right"
      data-testid="popover"
      header={
        <>
          <p className="font-weight-semi-bold popover-title">New repository</p>

          <ClayForm.Group className={feedbackError ? 'has-error' : ''}>
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
              data-testid="repositoryTextInput"
              id="repository"
              onChange={handleChangeRepoName}
              onKeyPress={handleKeyPress}
              placeholder="e.g. liferay/clay"
              ref={repoNameRef}
              type="text"
              value={repoName}
            />
            {feedbackError && (
              <ClayForm.FeedbackItem>
                <ClayForm.FeedbackIndicator symbol="exclamation-full" />
                {feedbackError}
              </ClayForm.FeedbackItem>
            )}
          </ClayForm.Group>
        </>
      }
      onShowChange={setIsShowPopover}
      show={isShowPopover}
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
          disabled={Boolean(feedbackError)}
          displayType="primary"
          onClick={handleClickAddRepo}
        >
          Add
        </ClayButton>
      </ClayButton.Group>
    </ClayPopover>
  );
};

export default AddRepoPopover;
