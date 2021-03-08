import React from 'react';

import ClayButton from '@clayui/button';
import ClayModal, { useModal } from '@clayui/modal';

import { DashboardContext } from 'contexts/dashboard';

type Props = {
  visible: boolean;
  setVisible: (isVisible: boolean) => void;
};

const ModalDelete = ({ visible, setVisible }: Props): JSX.Element => {
  const { selectedRepository, deleteRepository } = React.useContext(
    DashboardContext
  );

  const { observer, onClose } = useModal({
    onClose: () => setVisible(false),
  });

  return (
    <>
      {visible && (
        <ClayModal observer={observer} size="sm" status="danger" center>
          <ClayModal.Header>Delete repository</ClayModal.Header>
          <ClayModal.Body>
            <p style={{ color: '#333' }}>
              Are you sure to delete the{' '}
              <span className="font-weight-semi-bold">
                {selectedRepository?.full_name}
              </span>{' '}
              repository?
            </p>
          </ClayModal.Body>
          <ClayModal.Footer
            last={
              <ClayButton.Group spaced>
                <ClayButton displayType="secondary" onClick={onClose}>
                  Cancel
                </ClayButton>
                <ClayButton
                  className="btn btn-danger"
                  onClick={() => {
                    setVisible(false);

                    deleteRepository();
                  }}
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

export default ModalDelete;
