import React from "react";
import { Button } from "components/Button";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import { Spinner } from "components/Spinner";

const CategoryDeleteModal = (props) => {
  const { id, isOpen, toggleDelete, isLoading, onDelete } = props;

  return (
    <Modal isOpen={isOpen} toggle={toggleDelete}>
      <ModalHeader toggle={() => toggleDelete()}>Delete Category</ModalHeader>
      <ModalBody>Are you sure to delete category: {id}?</ModalBody>
      <ModalFooter>
        <Button
          onClick={() => onDelete(id)}
          color="danger"
          className="p-2"
        >
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CategoryDeleteModal
