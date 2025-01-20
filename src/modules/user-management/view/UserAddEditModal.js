import React, { useState } from "react";
import * as Yup from "yup";
import CustomForm from "components/Form/Form";
import FormGroup from "components/Form/FormGroup";
import { Input } from "components/Input";
import { validateForm } from "utils/validate";
import { Modal, ModalBody, ModalHeader } from "components/Modal";
import { AvatarUpload } from "components/Input/AvatarUpload";
import { Spinner } from "components/Spinner";
import { StatusDropdown } from "components/Input/Status-dropdown";
import { Button } from "components/Button";

const UserAddEditModal = (props) => {
  const { data, isOpen, toggle, onSubmit, isFetching, isLoading } = props;
  const {
    userID,
    firstName,
    lastName,
    status,
    email,
    role,
    password,
    profileImageUrl,
  } = data || {};
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required."),
    lastName: Yup.string().required("Last Name is required."),
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
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      scrollable
      modalClassName="max-h-[80vh] w-full max-w-5xl"
    >
      <ModalHeader toggle={() => toggle()}>{header}</ModalHeader>
      <ModalBody>
        {isFetching || isLoading ? (
          <Spinner />
        ) : (
          <CustomForm
            onSubmit={onSubmit}
            validate={validate}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              <div className="flex justify-center">
                <AvatarUpload
                  name="profileImagePath"
                  initialImage={profileImageUrl}
                  size="w-32 h-32"
                  className="mb-2"
                />
              </div>
              {userID && (
                <div className="flex justify-center text-lg font-bold">
                  {userID}
                </div>
              )}
              <div className="border-t border-gray-200"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Personal Information
                  </h3>
                  <FormGroup
                    label="First Name"
                    error={errors.firstName}
                    isRequired={firstName ? false : true}
                  >
                    <Input
                      name="firstName"
                      type="text"
                      defaultValue={firstName}
                      placeholder="First Name"
                      className="w-full p-2 border rounded"
                    />
                  </FormGroup>
                  <FormGroup
                    label="Last Name"
                    error={errors.lastName}
                    isRequired={firstName ? false : true}
                  >
                    <Input
                      name="lastName"
                      type="text"
                      defaultValue={lastName}
                      placeholder="Last Name"
                      className="w-full p-2 border rounded"
                    />
                  </FormGroup>
                  <FormGroup label="Email" error={errors.email}>
                    <Input
                      name="email"
                      type="email"
                      defaultValue={email}
                      placeholder="Email address"
                      className="w-full p-2 border rounded"
                    />
                  </FormGroup>
                </div>

                <div className="space-y-6">
                  {data && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-gray-700">
                        Status
                      </h3>
                      <FormGroup>
                        <StatusDropdown
                          name="status"
                          defaultValue={status}
                          className="w-full p-2 border rounded"
                        />
                      </FormGroup>

                      <div className="border-b border-gray-200"></div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Password
                    </h3>
                    <FormGroup
                      label={password ? "New Password" : "Password"}
                      error={errors.password}
                    >
                      <Input
                        name="password"
                        type={passwordVisible ? "text" : "password"}
                        placeholder={
                          data
                            ? "New Password (Leave empty to keep current password)"
                            : "Password"
                        }
                        className="w-full p-2 border rounded"
                      />
                    </FormGroup>
                    <FormGroup
                      label="Confirm Password"
                      error={errors.confirmPassword}
                    >
                      <Input
                        name="confirmPassword"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="w-full p-2 border rounded"
                      />
                    </FormGroup>
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-800"
                        onClick={handlePasswordToggle}
                      >
                        {passwordVisible ? "Hide Password" : "Show Password"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200"></div>

              <div className="mt-6">
                <Button
                  color="primary"
                  type="submit"
                  className="w-full py-2.5 px-4 text-sm font-semibold rounded"
                  disabled={isFetching || isLoading}
                >
                  {isLoading ? "Submitting..." : header}
                </Button>
              </div>
            </div>
          </CustomForm>
        )}
      </ModalBody>
    </Modal>
  );
};

export default UserAddEditModal;
