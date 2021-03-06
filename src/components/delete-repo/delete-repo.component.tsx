import React from 'react';

import ClayButton from '@clayui/button';
import ClayModal, { useModal } from '@clayui/modal';

import { useHomeContext } from 'hooks/use-home.hook';
import { useSearchBarContext } from 'hooks/use-search-bar.hook';
import { GitHubRepo } from 'services/github.service';

type Props = {
  repo: GitHubRepo | null;
  visible: boolean;
  setVisible: (isVisible: boolean) => void;
};

const DeleteRepoModal = ({ repo, visible, setVisible }: Props): JSX.Element => {
  const { repositories, setRepositories } = useHomeContext();
  const { isFiltering, setFilteredRepos } = useSearchBarContext();

  const handleClose = () => {
    setVisible(false);
  };

  const { observer } = useModal({});

  const handleClickDeleteRepo = () => {
    if (repo) {
      const repos = repositories.filter(({ id }) => id !== repo.id);
      setRepositories(repos);

      if (isFiltering) {
        setFilteredRepos(repos);
      }
    }

    handleClose();
  };

  return (
    <>
      {visible && (
        <ClayModal center observer={observer} size="sm" status="danger">
          <ClayModal.Header>Delete repository</ClayModal.Header>

          <ClayModal.Body>
            <p style={{ color: '#333' }}>
              Are you sure to delete the{' '}
              <span
                data-testid="repositoryFullName"
                className="font-weight-semi-bold"
              >
                {repo?.full_name}
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
                <ClayButton
                  className="btn btn-danger"
                  onClick={handleClickDeleteRepo}
                >
                  Delete
                </ClayButton>
              </ClayButton.Group>
            }
          />
        </ClayModal>
      )}
    </>
  );
};

export default DeleteRepoModal;
