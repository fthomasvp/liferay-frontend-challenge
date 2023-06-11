import React from 'react';

import ClayButton from '@clayui/button';
import ClayModal from '@clayui/modal';
import { Observer } from '@clayui/modal/lib/types';
import Spritemap from '@clayui/css/lib/images/icons/icons.svg';

import { useHomeContext } from 'context/HomeContext';
import { useSearchBarContext } from 'context/SearchBarContext';
import { TGitHubRepo } from 'features/github';

type Props = {
  repo: TGitHubRepo;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  observer: Observer;
};

const DeleteRepoModal = ({ repo, isOpen, setIsOpen, observer }: Props) => {
  const { repositories, setRepositories } = useHomeContext();
  const { isFiltering, setFilteredRepos } = useSearchBarContext();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDeleteRepo = () => {
    if (repo) {
      const repos = repositories.filter(({ id }) => id !== repo.id);
      setRepositories(repos);

      if (isFiltering) {
        setFilteredRepos(repos);
      }
    }

    handleClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ClayModal
      center
      observer={observer}
      size="sm"
      status="danger"
      spritemap={Spritemap}
    >
      <ClayModal.Header>Delete repository</ClayModal.Header>

      <ClayModal.Body>
        <p style={{ color: '#333' }}>
          Are you sure to delete the{' '}
          <span
            data-testid="repositoryFullName"
            className="font-weight-semi-bold"
          >
            {repo.full_name}
          </span>{' '}
          repository?
        </p>
      </ClayModal.Body>

      <ClayModal.Footer
        last={
          <ClayButton.Group spaced>
            <ClayButton displayType="secondary" onClick={handleClose}>
              Cancel
            </ClayButton>
            <ClayButton className="btn btn-danger" onClick={handleDeleteRepo}>
              Delete
            </ClayButton>
          </ClayButton.Group>
        }
      />
    </ClayModal>
  );
};

export default DeleteRepoModal;
