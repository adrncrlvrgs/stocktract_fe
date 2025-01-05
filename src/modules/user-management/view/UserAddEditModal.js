import React, { useState } from "react";
import * as Yup from "yup";
import CustomForm from "components/Form/Form";
import { Input } from "components/Input";
import { validateForm } from "utils/validate";
import { Modal, ModalBody, ModalHeader } from "components/Modal";
import { AvatarUpload } from "components/Input/AvatarUpload";
import { Spinner } from "components/Spinner";

const UserAddEditModal = (props) => {
  const { data, isOpen, toggle, onSubmit, isFetching, isLoading } = props;
  const { userID, status, email, name, role, password,profileImageUrl } = data || {};
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required."),
    email: Yup.string()
      .email("Email is invalid.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long.")
      .when("isNewUser", {
        is: true,
        then: Yup.string().required("Password is required."),
      }),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .when("isNewUser", {
        is: true,
        then: Yup.string().required("Please confirm your password."),
      }),
  });

  const validate = async (data) => {
    return await validateForm(data, validationSchema, setErrors);
  };

  const header = data ? "Edit User" : "Add User";

  const handlePasswordToggle = () => setPasswordVisible(!passwordVisible);

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
              <div className="flex justify-center">
                <AvatarUpload
                  name="profileImagePath" 
                  initialImage={profileImageUrl} 
                  size="w-32 h-32" 
                  className="mb-4" 
                />
              </div>
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
                type={passwordVisible ? "text" : "password"}
                placeholder={
                  data
                    ? "New Password (Leave empty to keep current password)"
                    : "Password"
                }
                error={errors.password}
              />
              <Input
                name="confirmPassword"
                type={passwordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                error={errors.confirmPassword}
              />
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="text-sm text-blue-600"
                  onClick={handlePasswordToggle}
                >
                  {passwordVisible ? "Hide Password" : "Show Password"}
                </button>
              </div>
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
