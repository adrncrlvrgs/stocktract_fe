import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "components/Modal";
import { Spinner } from "components/Spinner";

const UserDeleteModal = (props) => {
  const { id, isOpen, toggleDelete, isLoading, onDelete } = props;

  return (
    <Modal isOpen={isOpen} toggle={toggleDelete}>
      <ModalHeader toggle={() => toggleDelete()}>Delete User</ModalHeader>
      <ModalBody>Are you sure to delete user: {id}?</ModalBody>
      <ModalFooter>
        <button
          onClick={() => onDelete(id)}
          className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none"
        >
          Delete
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default UserDeleteModal
