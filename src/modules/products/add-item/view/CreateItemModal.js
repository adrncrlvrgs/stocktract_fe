import React, { useState } from "react";
import * as Yup from "yup";
import CustomForm from "components/Form/Form";
import { Input } from "components/Input";
import { validateForm } from "utils/validate";
import { Modal, ModalBody, ModalHeader } from "components/Modal";
import { Spinner } from "components/Spinner";
import { ImageUpload } from "components/Input/ImageUpload";

const CreateItemModal = (props) => {
  const { data, isOpen, toggle, onSubmit, isFetching, isLoading } = props;
  const { itemID, item, quantity, category } = data || {};
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    quantity: Yup.number().required("Quantity is required."),
    itemImages: Yup.array()
      .required("At least one image is required.")
      .min(1, "At least one image is required.")
      .max(5, "You can upload a maximum of 5 images.")
      .test("fileSize", "Each image must be less than 2MB", (value) => {
        if (!value || value.length === 0) return false;
        return value.every((file) => file.size <= 2 * 1024 * 1024);
      }),
  });

  const validate = async (data) => {
    return await validateForm(data, validationSchema, setErrors);
  };

  const header = "Add Item to Sale";

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
              <div>
                <label>Item Id: </label>
                <span>{itemID}</span>
              </div>
              <div>
                <label>Name: </label>
                <span>{item}</span>
              </div>
              <div>
                <label>Available Quantity: </label>
                <span>{quantity}</span>
              </div>
              <div>
                <label>Category: </label>
                <span>{category}</span>
              </div>

              {/* Quantity Input */}
              <Input
                name="quantity"
                type="number"
                placeholder="Quantity"
                error={errors.quantity}
              />

              {/* Image Upload Component */}
              <div>
                <label>Upload Images (Max 5):</label>
                <ImageUpload
                  name="itemImages"
                  multiple={true} 
                  maxImages={5} 
                  error={errors.images} 
                />
                {errors.images && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.images}
                  </div>
                )}
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

export default CreateItemModal;
