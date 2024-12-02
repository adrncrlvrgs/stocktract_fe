import CustomForm from "components/Form/Form";
import Input from "components/Input/Input";
import { Modal, ModalBody, ModalHeader } from "components/Modal";

import React from "react";

const UserAddEditModal = (props) => {
  const { data, isOpen, toggle, onSubmit } = props;
  const { userID, status, email, name, role } = data || {};
  const header = data ? "Edit User" : "Add User";
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={() => toggle()}></ModalHeader>
      <ModalBody>
        <CustomForm
          onSubmit={handleSignUp}
          className="max-w-md md:ml-auto w-full"
        >
          <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
            Sign up
          </h3>
          <div className="space-y-4">
            <Input
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Full Name"
              defaultValue={name}
              required
            />
            {data && (
              <Input
                name="status"
                type="text"
                placeholder="Status"
                defaultValue={status}
                required
              />
            )}
            <Input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              defaultValue={email}
              required
            />

            <Input
              name="role"
              type="text"
              placeholder="Role (e.g. Manager)"
              defaultValue={role}
              required
            />
          </div>
          <div className="!mt-8">
            <button
              type="submit"
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              {header}
            </button>
          </div>
        </CustomForm>
      </ModalBody>
    </Modal>
  );
};

export default UserAddEditModal;
