import React, { useState } from "react";
import * as Yup from "yup";
import CustomForm from "components/Form/Form";
import Input from "components/Input/Input";
import { validateForm } from "utils/validate";
import { Modal, ModalBody, ModalHeader } from "components/Modal";
import { Spinner } from "components/Spinner";

const UserAddEditModal = (props) => {
  const { data, isOpen, toggle, onSubmit, isFetching, isLoading } = props;
  const { userID, status, email, name, role, password } = data || {};
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required."),
    email: Yup.string()
      .email("Email is invalid.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long.")
      .required("Password is required."),
  });

  const validate = async (data) => {
    return await validateForm(data, validationSchema, setErrors);
  };

  const header = data ? "Edit User" : "Add User";
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={() => toggle()}>{header}</ModalHeader>
      <ModalBody>
        {isFetching || isLoading ? (
          <Spinner />
        ) : (
          <CustomForm
            onSubmit={onSubmit}
            validate={validate}
            className="max-w-md md:ml-auto w-full"
          >
            <div className="space-y-4">
              <Input
                name="name"
                type="text"
                defaultValue={name}
                placeholder="Full Name"
                required
                error={errors.name}
              />
              <Input
                name="email"
                type="email"
                defaultValue={email}
                placeholder="Email address"
                required
                error={errors.email}
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
                defaultValue={password}
                error={errors.password}
              />
              {/* can be more */}
            </div>
            <div className="!mt-8">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                disabled={isFetching || isLoading}
              >
                {isLoading ? "Submitting..." : header}
              </button>
            </div>
          </CustomForm>
        )}
      </ModalBody>
    </Modal>
  );
};

export default UserAddEditModal;
