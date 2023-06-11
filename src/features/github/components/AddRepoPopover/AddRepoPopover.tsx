import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import ClayButton from '@clayui/button';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayPopover from '@clayui/popover';
import { ClayButtonWithIcon } from '@clayui/button';

import { getRepository, getRepositoryCommits } from 'features/github';
import { useHomeContext } from 'context/HomeContext';
import { isValidRepositoryName } from 'utils/validations';

const AddRepoPopover = () => {
  const { repositories, setRepositories } = useHomeContext();

  const [error, setError] = useState('');
  const [repoName, setRepoName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const repoNameRef = useRef<HTMLInputElement | null>(null);

  const handleAddRepo = async () => {
    if (!isValidRepositoryName(repoName)) {
      setError('Repository full name is not valid');

      return;
    }

    const [username, repositoryName] = repoName.split('/');

    const repository = await getRepository({ username, repositoryName });

    if (!repository) {
      setError('Repository is private or does not exist');

      return;
    }

    const isDuplicatedRepo = repositories.find(
      ({ id }) => id === repository.id
    );

    if (isDuplicatedRepo) {
      setError('Repository is already included in your list');

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

    handleClosePopover();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      handleAddRepo();
    }
  };

  const handleChangeRepoName = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setRepoName(target.value);
  };

  const handleClosePopover = () => {
    setIsOpen(false);
    setError('');
    setRepoName('');
  };

  useEffect(() => {
    if (isOpen && repoNameRef.current) {
      repoNameRef.current.focus();
    }
  }, [isOpen]);

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
              onKeyDown={handleKeyDown}
              placeholder="liferay/clay"
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
      onShowChange={setIsOpen}
      show={isOpen}
      trigger={<ClayButtonWithIcon aria-label="Add button" symbol="plus" />}
    >
      <ClayButton.Group className="d-flex justify-content-end" spaced>
        <ClayButton displayType="secondary" onClick={handleClosePopover}>
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
