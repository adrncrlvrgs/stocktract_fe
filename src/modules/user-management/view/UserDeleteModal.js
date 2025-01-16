import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "components/Modal";
import { Spinner } from "components/Spinner";
import { Button } from "components/Button";

const UserDeleteModal = (props) => {
  const { id, isOpen, toggleDelete, isLoading, onDelete } = props;

  return (
    <Modal isOpen={isOpen} toggle={toggleDelete}>
      <ModalHeader toggle={() => toggleDelete()}>Delete User</ModalHeader>
      {isLoading ? (
        <div className="p-4">
          <Spinner />
        </div>
      ) : (
        <>
          <ModalBody>Are you sure to delete user: {id}?</ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => onDelete(id)}
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded "
            >
              Delete
            </Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
};

export default UserDeleteModal;
