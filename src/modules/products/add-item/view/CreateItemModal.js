import React, { useState } from "react";
import * as Yup from "yup";
import CustomForm from "components/Form/Form";
import FormGroup from "components/Form/FormGroup";
import { Input } from "components/Input";
import { validateForm } from "utils/validate";
import { Modal, ModalBody, ModalHeader } from "components/Modal";
import { Spinner } from "components/Spinner";
import { ImageUpload } from "components/Input/ImageUpload";

const AddItemToSaleModal = (props) => {
  const { data, isOpen, toggle, onSubmit, isFetching, isLoading } = props;
  const {
    stockID,
    item,
    totalQuantity,
    category,
    supplier,
    unit,
    location,
    expirationDate,
    notes,
  } = data || {};
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    quantity: Yup.number()
      .required("Quantity is required.")
      .max(totalQuantity || 0, `Quantity cannot exceed ${totalQuantity}`),
    price: Yup.number()
      .required("Price is required.")
      .positive("Price must be a positive number."),
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

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  const header = "Add Item to Sale";

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
            onSubmit={handleFormSubmit}
            validate={validate}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side: Stock Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Stock Information
                </h3>
                {!data ? (
                  <p className="text-gray-600">No stock data available.</p>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stock ID:</span>
                      <span className="text-black">{stockID}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Item:</span>
                      <span className="text-black">{item}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="text-black">{category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available Quantity:</span>
                      <span className="text-black">{totalQuantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Supplier:</span>
                      <span className="text-black">{supplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Unit of Measurement:
                      </span>
                      <span className="text-black">{unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="text-black">{location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expiration Date:</span>
                      <span className="text-black">{expirationDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Notes:</span>
                      <span className="text-black">{notes}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side: Input Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Sale Details
                </h3>
                <FormGroup
                  label="Quantity to Sell"
                  error={errors.quantity}
                  isRequired
                >
                  <Input
                    name="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    className="w-full p-2 border rounded"
                  />
                </FormGroup>
                <FormGroup label="Price" error={errors.price} isRequired>
                  <Input
                    name="price"
                    type="number"
                    placeholder="Enter the price"
                    className="w-full p-2 border rounded"
                  />
                </FormGroup>
                <FormGroup label="Description" error={errors.description}>
                  <Input
                    name="description"
                    type="textarea"
                    placeholder="Enter a detailed description"
                    className="w-full p-2 border rounded"
                  />
                </FormGroup>
                <FormGroup
                  label="Upload Images (Max 5)"
                  error={errors.itemImages}
                  isRequired
                >
                  <ImageUpload
                    name="itemImages"
                    multiple={true}
                    maxImages={5}
                    error={errors.itemImages}
                  />
                </FormGroup>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
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

export default AddItemToSaleModal;
